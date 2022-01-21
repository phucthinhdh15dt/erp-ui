<template>
    <div class="ActionArea">
        <Button type="primary" style="margin-right: 1rem" @click="showCreateModal"> Tạo mới </Button>
        <Modal
            v-model:visible="visible"
            :title="title"
            ok-text="Xác nhận"
            cancel-text="Đóng"
            :mask-closable="false"
            :closable="false"
        >
            <Form
                ref="formRef"
                :label-col="{ span: 6 }"
                :wrapper-col="{ span: 18 }"
                label-align="left"
                :model="formState"
            >
                <FormItem
                    label="Mã thuộc tính"
                    name="code"
                    :rules="{
                        required: true,
                        message: 'Vui lòng nhập mã thuộc tính',
                    }"
                >
                    <Input
                        v-model:value="formState.code"
                        :disabled="progress.total > 0 || (processingItem && processingItem.id)"
                        style="width: 100%"
                        @keypress="onlyNumber"
                    >
                    </Input>
                </FormItem>
                <FormItem
                    label="Tên thuộc tính"
                    name="label"
                    :rules="{
                        required: true,
                        message: 'Vui lòng nhập tên thuộc tính',
                    }"
                >
                    <Input v-model:value="formState.label" :disabled="progress.total > 0"> </Input>
                </FormItem>
                <FormItem label="Mô tả" name="description">
                    <TextArea v-model:value="formState.description" :rows="4" :disabled="progress.total > 0"></TextArea>
                </FormItem>
                <FormItem
                    label="Tính chất"
                    name="uiComponentType"
                    :rules="{
                        required: true,
                        message: 'Vui lòng chọn tính chất',
                    }"
                >
                    <Select
                        v-model:value="formState.uiComponentType"
                        :options="typeOptions"
                        show-search
                        :filter-option="filterOption"
                    />
                </FormItem>
                <FormItem
                    v-if="isSelectValue()"
                    label="Giá trị"
                    name="values"
                    :rules="{
                        required: true,
                        message: 'Vui lòng chọn giá trị thuộc tính',
                    }"
                >
                    <Select v-model:value="formState.values" mode="tags" />
                </FormItem>
            </Form>
            <Progress
                v-if="progress.total"
                :stroke-color="{
                    from: '#108ee9',
                    to: '#87d068',
                }"
                :percent="Math.round((progress.completed / progress.total) * 100)"
                status="active"
            />
            <template #footer>
                <Button key="back" :disabled="progress.total > 0" @click="onCancel">Đóng</Button>
                <Button key="submit" type="primary" :loading="progress.total > 0" @click="onConfirm">Xác nhận</Button>
            </template>
        </Modal>
    </div>
</template>

<script>
import { defineComponent, watch, computed, inject, toRaw, ref, reactive, createVNode } from 'vue';
import { Button, message, Modal, Progress, Form, Input, Select } from 'ant-design-vue';
import { useStore } from 'vuex';
import { useCreateAttribute, useUpdateAttribute } from '@/composables/attribute/index';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { filterOption } from '@/utils/common';
import { AttributeItemType } from '@/constants/attributeItem';
import { onlyNumber } from '@/utils/common';

const { Item: FormItem } = Form;
const { TextArea } = Input;

export default defineComponent({
    name: 'ActionArea',
    components: {
        Button,
        Modal,
        Progress,
        Form,
        FormItem,
        Input,
        TextArea,
        // Row,
        // Col,
        Select,
    },
    setup() {
        const store = useStore();
        const onSearch = inject('onSearch');
        const searchQuery = inject('searchQuery');
        const processingItem = inject('processingItem');

        const configSelect = ['MULTI_SELECT', 'SINGLE_SELECT'];

        const { createAttribute, result: resultCreate } = useCreateAttribute();
        const { updateAttribute, result: resultUpdate } = useUpdateAttribute();

        const visible = ref(false);
        const formState = reactive({
            code: undefined,
            defaultValue: '',
            description: '',
            label: '',
            pic: '',
            type: 'META',
            uiComponentType: '',
            values: [],
        });
        const formRef = ref();

        const typeOptions = AttributeItemType.map(_ => ({ value: _.value, label: _.text }));

        const title = computed(() =>
            processingItem.value ? `Chỉnh sửa thuộc tính: ${processingItem.value.label}` : 'Tạo thuộc tính mới'
        );

        const progress = computed(() => store.state.list.progress);

        const showCreateModal = () => {
            visible.value = true;
        };

        const onCancel = () => {
            visible.value = false;
            console.log(formRef.value);
            processingItem.value = null;
            formRef.value.clearValidate();
        };

        const onConfirm = async () => {
            formRef.value
                .validateFields()
                .then(values => {
                    console.log('Received values of form: ', values);
                    console.log('formState: ', toRaw(formState));
                    const payload = toRaw(formState);

                    if (processingItem.value) {
                        // payload.id = processingItem.value.id;
                        Modal.confirm({
                            content: 'Xác nhận lưu bản chỉnh sửa này',
                            icon: createVNode(ExclamationCircleOutlined),
                            onOk() {
                                updateAttribute(payload);
                                visible.value = false;
                                formRef.value.resetFields();
                                processingItem.value = null;
                            },
                            cancelText: 'Quay lại',
                            okText: 'Xác nhận',
                            onCancel() {},
                        });
                    } else {
                        createAttribute(payload);
                        visible.value = false;
                        formRef.value.resetFields();
                        processingItem.value = null;
                    }

                    console.log('reset formState: ', toRaw(formState));
                })
                .catch(info => {
                    console.log('Validate Failed:', info);
                });
        };

        watch(processingItem, () => {
            if (processingItem.value) {
                console.log('processingItem.value', processingItem.value);
                formState.label = processingItem.value.label;
                formState.code = processingItem.value.code;
                formState.description = processingItem.value.description;
                formState.uiComponentType = processingItem.value.uiComponentType;
                if (processingItem.value.values && processingItem.value.values.length > 0) {
                    formState.values = JSON.parse(processingItem.value.values).map(m => m.value);
                }
                visible.value = true;
            } else {
                // formRef.value.resetFields();
                formState.label = '';
                formState.code = undefined;
                formState.description = '';
                formState.uiComponentType = undefined;
                formState.values = [];
            }
        });

        watch(
            searchQuery,
            () => {
                store.commit('list/setSearchSelectedAll', false);
            },
            { deep: true }
        );

        watch(
            resultCreate,
            () => {
                if (resultCreate.value) {
                    message.success(resultCreate.value);
                    const timeout = setTimeout(() => {
                        onSearch();
                        clearTimeout(timeout);
                    }, 1000);
                }
            },
            { deep: true }
        );

        watch(
            resultUpdate,
            () => {
                if (resultUpdate.value) {
                    message.success(resultUpdate.value);
                    const timeout = setTimeout(() => {
                        onSearch();
                        clearTimeout(timeout);
                    }, 1000);
                }
            },
            { deep: true }
        );

        const isSelectValue = () => {
            if (typeOptions.find(f => f.value === formState.uiComponentType && configSelect.includes(f.value))) {
                return true;
            }
            return false;
        };

        return {
            onConfirm,
            visible,
            progress,
            onCancel,
            showCreateModal,
            formState,
            // subCatInput,
            // onAddSubCat,
            formRef,
            typeOptions,
            title,
            filterOption,
            processingItem,
            isSelectValue,
            onlyNumber,
        };
    },
});
</script>

<style lang="scss">
.ActionArea {
    width: fit-content;
    flex: 1;
    justify-content: end;
    text-align: right;

    &--delete {
        margin-right: 1rem;
    }
}
</style>
