<template>
    <Modal
        v-if="modelRef"
        class="BrandModal"
        :visible="isOpen"
        :title="isEdit ? `Chỉnh sửa thương hiệu: ${modelRef.name}` : 'Tạo mới thương hiệu'"
        @ok="onCreate"
        @cancel="onClose"
    >
        <template #footer>
            <Button type="primary" danger @click="handleCancel">Hủy</Button>
            <Button v-if="isEdit" type="primary" :loading="loading" @click="onSubmit"><CheckOutlined />Cập nhật</Button>
            <Button v-else type="primary" :loading="loading" @click="onSubmit"><CheckOutlined />Thêm mới</Button>
        </template>
        <Form label-align="left">
            <Row>
                <FormItem label="Mã thương hiệu" v-bind="validateInfos['code']">
                    <label v-if="isEdit"
                        ><b>{{ modelRef.code }}</b></label
                    >
                    <Input v-else v-model:value="modelRef.code" />
                </FormItem>
            </Row>
            <Row>
                <FormItem label="Tên thương hiệu" v-bind="validateInfos['name']">
                    <Input v-model:value="modelRef.name" />
                </FormItem>
            </Row>
            <Row>
                <FormItem label="Mô tả" v-bind="validateInfos['description']">
                    <TextArea v-model:value="modelRef.description" />
                </FormItem>
            </Row>
            <Row>
                <FormItem label="Trạng thái" v-bind="validateInfos['status']">
                    <Select
                        v-model:value="modelRef.status"
                        placeholder="Chọn trạng thái"
                        label-in-value
                        size="large"
                        style="width: 100%"
                    >
                        <Option v-for="option in optionStatus" :key="option.value" :value="option.value">
                            {{ option.label }}</Option
                        >
                    </Select>
                </FormItem>
            </Row>
        </Form>
    </Modal>
</template>

<script>
import { defineComponent, reactive, computed, watch, inject } from 'vue';
import { Modal, Input, Form, Row, Button, message, Select } from 'ant-design-vue';
import { useCreateBrand } from '@/composables/brand';
import { useStore } from 'vuex';
import formRules from '@/composables/brand/rules';
import { CheckOutlined } from '@ant-design/icons-vue';
import { STATUS_BRAND } from '@/constants';

const useForm = Form.useForm;
const { Item: FormItem } = Form;
const { TextArea } = Input;
const { Option } = Select;

export default defineComponent({
    name: 'ActionArea',
    components: {
        Modal,
        Input,
        TextArea,
        Form,
        Row,
        FormItem,
        Button,
        CheckOutlined,
        Option,
        Select,
    },
    props: {
        visible: {
            type: Boolean,
            default: () => false,
        },
    },
    setup() {
        const store = useStore();
        const modelRef = computed(() => store.state.brand.data);
        const isOpen = computed(() => store.state.brand.isOpen);
        const isEdit = computed(() => store.state.brand.isEdit);

        const optionStatus = Object.values(STATUS_BRAND).map(_ => ({ value: _.code, label: _.label }));

        const onSearch = inject('onSearch');

        const rulesRef = reactive(formRules);
        const form = useForm(modelRef, rulesRef);

        const { loading, result, createBrand, updateBrand } = useCreateBrand();

        const { resetFields, validate, validateInfos } = form;

        const onSubmit = () => {
            validate()
                .then(() => {
                    if (modelRef.value.id) {
                        updateBrand(modelRef.value);
                    } else {
                        createBrand(modelRef.value);
                    }
                })
                .catch(err => {
                    console.log('error', err);
                });
        };

        const handleCancel = () => {
            resetFields();
            store.commit('brand/setIsOpen', false);
        };
        const onClose = () => {
            store.commit('brand/setIsOpen', !isOpen.value);
            store.commit('brand/setIsEdit', false);
        };

        watch(
            () => result.value,
            () => {
                if (result.value && !loading.value) {
                    if (modelRef.value.id) {
                        message.success('Cập nhật thương hiệu thành công!');
                    } else {
                        message.success('Tạo mới thương hiệu thành công!');
                    }
                    setTimeout(() => {
                        onSearch();
                    }, 500);
                    handleCancel();
                }
            }
        );
        return {
            onSubmit,
            modelRef,
            validateInfos,
            isOpen,
            onClose,
            handleCancel,
            loading,
            isEdit,
            optionStatus,
        };
    },
});
</script>
<style lang="scss">
.BrandModal {
    .ant-col:first-child {
        width: 150px;
        padding-right: 1.6rem;
    }
}
</style>
