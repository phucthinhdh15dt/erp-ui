<template>
    <Row justify="space-between">
        <div class="card-head-title font-18 font-bold">Nhóm thuộc tính</div>
        <div class="mt-12">
            <Button type="primary" danger class="mr-12" @click="onCancel">Hủy bỏ</Button>
            <Button
                type="primary"
                class="confirm"
                :disabled="
                    !modelRef.category ||
                    !modelRef.brand ||
                    !modelRef.name ||
                    !modelRef.attributes ||
                    modelRef.attributes.length <= 0
                "
                @click="onCreate"
                >Xác nhận</Button
            >
        </div>
    </Row>
</template>
<script>
import { Row, Button, Modal, message } from 'ant-design-vue';
import { inject, watch } from 'vue';
import { useCreate } from '@/composables/attribute/create';

export default {
    components: {
        Button,
        Row,
    },
    setup() {
        const modelRef = inject('modelRef');
        const form = inject('form');
        const { validate, resetFields } = form;
        const { result, createAttribute } = useCreate();

        const onCancel = () => {
            Modal.confirm({
                title: 'Bạn có muốn hủy hết thao tác?',
                content: '',
                okText: 'Xác nhận',
                cancelText: 'Đóng',
                centered: true,
                onOk: resetField,
            });
        };
        const resetField = () => {
            resetFields();
        };
        const onCreate = () => {
            if (modelRef.value.attributes.length >= 0) {
                var exits = modelRef.value.attributes.findIndex(_ => !_.id || _.id <= 0);
                if (exits >= 0) {
                    message.warning('Vui lòng kiểm tra lại danh sách thuộc tính');
                }
            } else {
                validate()
                    .then(() => {
                        Modal.confirm({
                            title: 'Xác nhận tạo nhóm thuộc tính',
                            content: '',
                            okText: 'Xác nhận',
                            cancelText: 'Đóng',
                            centered: true,
                            onOk: createAttribute,
                        });
                    })
                    .catch(error => {
                        console.log('error', error);
                    });
            }
        };

        watch(
            () => result,
            () => {
                if (result.value) {
                    Modal.info({
                        title: 'Tạo nhóm thuộc tính thành công',
                        content: () =>
                            h('div', {}, [
                                'Mã nhóm thuộc tính ',
                                h('a', { href: `/attribute/${result.value}` }, `#${result.value}`),
                            ]),
                        okText: 'Đóng',
                        centered: true,
                        onOk: () => {
                            window.location.reload();
                        },
                    });
                }
            },
            { deep: true }
        );
        return { onCancel, onCreate, modelRef };
    },
};
</script>
<style scoped lang="scss"></style>
