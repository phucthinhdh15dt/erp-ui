<template>
    <Modal class="BrandModal" :visible="isOpen" title="Tạo mới thương hiệu" @ok="onCreate" @cancel="onClose">
        <template #footer>
            <Button type="primary" danger @click="handleCancel">Hủy</Button>
            <Button type="primary" :loading="loading" @click="onSubmit"><CheckOutlined />Thêm mới</Button>
        </template>
        <Form label-align="left">
            <Row>
                <FormItem label="Mã thương hiệu" v-bind="validateInfos['code']">
                    <Input v-model:value="modelRef.code" />
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
        </Form>
    </Modal>
</template>

<script>
import { defineComponent, reactive, computed, watch, inject } from 'vue';
import { Modal, Input, Form, Row, Button, message } from 'ant-design-vue';
import { useCreateBrand } from '@/composables/brand';
import { useStore } from 'vuex';
import formRules from '@/composables/brand/rules';
import { CheckOutlined } from '@ant-design/icons-vue';

const useForm = Form.useForm;
const { Item: FormItem } = Form;
const { TextArea } = Input;

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
    },
    props: {
        visible: {
            type: Boolean,
            default: () => false,
        },
    },
    setup() {
        const store = useStore();
        const modelRef = computed(() => store.state.brand.create.data);
        const isOpen = computed(() => store.state.brand.isOpen);

        const onSearch = inject('onSearch');

        const rulesRef = reactive(formRules);
        const form = useForm(modelRef, rulesRef);

        const { loading, result, createBrand } = useCreateBrand();

        const { resetFields, validate, validateInfos } = form;

        const onSubmit = () => {
            validate()
                .then(() => {
                    createBrand(modelRef.value);
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
        };

        watch(
            () => result.value,
            () => {
                if (result.value && !loading.value) {
                    message.success('Tạo mới thương hiệu thành công!');
                    onSearch();
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
