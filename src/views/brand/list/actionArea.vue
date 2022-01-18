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
                    v-if="processingItem && processingItem.id"
                    label="Mã thương hiệu"
                    name="code"
                    :rules="{
                        required: true,
                        message: 'Vui lòng nhập mã thương hiệu',
                    }"
                >
                    <Input
                        v-model:value="formState.code"
                        :disabled="progress.total > 0 || (processingItem && processingItem.id)"
                    >
                    </Input>
                </FormItem>
                <FormItem
                    label="Tên thương hiệu"
                    name="name"
                    :rules="{
                        required: true,
                        message: 'Vui lòng nhập tên thương hiệu',
                    }"
                >
                    <Input v-model:value="formState.name" :disabled="progress.total > 0"> </Input>
                </FormItem>
                <FormItem label="Mô tả" name="description">
                    <TextArea v-model:value="formState.description" :rows="4" :disabled="progress.total > 0"></TextArea>
                </FormItem>
                <FormItem
                    v-if="processingItem && processingItem.id"
                    label="Trạng thái"
                    name="status"
                    :rules="{
                        required: true,
                        message: 'Vui lòng chọn trạng thái',
                    }"
                >
                    <Select
                        v-model:value="formState.status"
                        :options="statusOptions"
                        show-search
                        :filter-option="filterOption"
                    />
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
import { useCreateBrand, useUpdateBrand } from '@/composables/brand/index';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { filterOption } from '@/utils/common';
import { STATUS_BRAND } from '@/constants/index';

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

        const { createBrand, result: resultCreate } = useCreateBrand();
        const { updateBrand, result: resultUpdate } = useUpdateBrand();

        const visible = ref(false);
        const formState = reactive({
            code: '',
            description: '',
            name: '',
            status: '',
        });
        const formRef = ref();

        const statusOptions = Object.values(STATUS_BRAND).map(_ => ({ value: _.code, label: _.label }));

        const title = computed(() =>
            processingItem.value ? `Chỉnh sửa thương hiệu: ${processingItem.value.id}` : 'Tạo thương hiệu mới'
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
                    let payload = toRaw(formState);
                    if (processingItem.value) {
                        // payload.id = processingItem.value.id;
                        Modal.confirm({
                            content: 'Xác nhận lưu bản chỉnh sửa này',
                            icon: createVNode(ExclamationCircleOutlined),
                            onOk() {
                                updateBrand(payload);
                                visible.value = false;
                                formRef.value.resetFields();
                                processingItem.value = null;
                            },
                            cancelText: 'Quay lại',
                            okText: 'Xác nhận',
                            onCancel() {},
                        });
                    } else {
                        formState.status = STATUS_BRAND.ACTIVE.code;
                        payload = toRaw(formState);
                        createBrand(payload);
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
                formState.name = processingItem.value.name;
                formState.code = processingItem.value.code;
                formState.description = processingItem.value.description;
                formState.status = processingItem.value.status;
                visible.value = true;
            } else {
                // formRef.value.resetFields();
                formState.name = '';
                formState.code = '';
                formState.description = '';
                formState.status = undefined;
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
                    onSearch();
                }
            },
            { deep: true }
        );

        watch(
            resultUpdate,
            () => {
                if (resultUpdate.value) {
                    message.success(resultUpdate.value);
                    onSearch();
                }
            },
            { deep: true }
        );

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
            statusOptions,
            title,
            filterOption,
            processingItem,
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
