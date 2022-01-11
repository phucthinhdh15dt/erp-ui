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
                    label="Tên ngành"
                    name="name"
                    :rules="{
                        required: true,
                        message: 'Vui lòng nhập tên ngành',
                    }"
                >
                    <Input v-model:value="formState.name" :disabled="progress.total > 0"> </Input>
                </FormItem>
                <!-- <FormItem
                    label="Mã ngành"
                    name="code"
                    :rules="{
                        required: true,
                        message: 'Vui lòng nhập mã ngành',
                    }"
                >
                    <Input v-model:value="formState.code" :disabled="progress.total > 0"> </Input>
                </FormItem> -->
                <FormItem label="Mô tả" name="description">
                    <TextArea v-model:value="formState.description" :rows="4" :disabled="progress.total > 0"></TextArea>
                </FormItem>
                <FormItem label="Ngành hàng cha" name="parent">
                    <Select v-model:value="formState.parent" :options="parentOptions" />
                </FormItem>

                <!-- <h3>Ngành hàng con</h3>
                <List item-layout="horizontal" :data-source="formState.subCategories">
                    <template #renderItem="{ item, index }">
                        <ListItem>
                            <template #actions>
                                <DeleteOutlined style="color: red" @click="() => onRemoveItem(index)"></DeleteOutlined>
                            </template>

                            <FormItem
                                :name="['subCategories', index, 'name']"
                                :rules="{
                                    required: true,
                                    message: 'Vui lòng nhập giá trị',
                                }"
                                style="margin-bottom: 0"
                            >
                                <Input v-model:value="item.name" placeholder="Nhập tên ngành hàng con"></Input>
                            </FormItem>
                        </ListItem>
                    </template>
                </List> -->
            </Form>
            <!-- <Row class="mt-16 mb-16" :gutter="10">
                <Col :span="14" :push="3">
                    <Input v-model:value="subCatInput" placeholder="Nhập tên ngành hàng con"> </Input>
                </Col>
                <Col :span="4" :push="3"> <Button type="primary" ghost @click="onAddSubCat">Thêm</Button></Col>
            </Row> -->

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
        <!-- <ReceiptTemplate :order-data="receiptData" /> -->
    </div>
</template>

<script setup>
</script>
<script>
import { defineComponent, watch, computed, inject, toRaw, ref, reactive } from 'vue';
import { Button, message, Modal, Progress, Form, List, Input, Row, Col, Select } from 'ant-design-vue';
import { useStore } from 'vuex';
import { useCreateCategory, useUpdateCategory } from '@/composables/product/category';
// import { useGetOperationStatus, useGetCancelReason, useExportExcel } from '@/composables/order/common';
import { flow, map, getOr, mapKeys } from 'lodash/fp';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons-vue';

const { Item: FormItem } = Form;
const { Item: ListItem } = List;
const { TextArea } = Input;

const useForm = Form.useForm;

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
        // const subCatInput = ref('');

        const { createCategory, result: resultCreate } = useCreateCategory();
        const { updateCategory, result: resultUpdate } = useUpdateCategory();

        const visible = ref(false);
        const formState = reactive({
            name: '',
            // code: '',
            description: '',
            parent: null,
        });
        const formRef = ref();

        const parentOptions = computed(() =>
            store.state.list.allResults.data.map(_ => ({
                value: _.id,
                label: _.name,
            }))
        );

        const title = computed(() => (processingItem.value ? 'Chỉnh sửa ngành hàng' : 'Tạo ngành hàng mới'));

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

        // const onAddSubCat = () => {
        //     if (!subCatInput.value) {
        //         return;
        //     }

        //     formState.subCategories.push({ name: subCatInput.value });
        //     subCatInput.value = '';
        // };

        const onConfirm = async () => {
            formRef.value
                .validateFields()
                .then(values => {
                    console.log('Received values of form: ', values);
                    console.log('formState: ', toRaw(formState));
                    const { parent, ...rest } = toRaw(formState);
                    const payload = {
                        ...rest,
                        parentID: parent || 0,
                        categoryType: 'CAMPAIGN',
                    };
                    if (processingItem.value) {
                        updateCategory(payload);
                    } else {
                        createCategory(payload);
                    }
                    visible.value = false;
                    formRef.value.resetFields();
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
                formState.description = processingItem.value.description;
                formState.parent = processingItem.value.parentID || null;
                visible.value = true;
            } else {
                // formRef.value.resetFields();
                formState.name = '';
                formState.description = '';
                formState.parent = null;
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
            parentOptions,
            title,
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
