<template>
    <Row justify="space-between">
        <div class="card-head-title font-18 font-bold">Nhóm thuộc tính</div>
        <div class="mt-12">
            <Button type="primary" danger class="mr-12" @click="onCancel">Hủy bỏ</Button>
            <Button
                type="primary"
                class="confirm"
                :disabled="!modelRef.category || !modelRef.brand || !modelRef.name"
                @click="onCreate"
                >Xác nhận</Button
            >
        </div>
    </Row>
</template>
<script>
import { Row, Button, Modal } from 'ant-design-vue';
import { inject } from 'vue';

export default {
    components: {
        Button,
        Row,
    },
    setup() {
        const modelRef = inject('modelRef');
        const resetFields = inject('resetFields');

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
        const onCreate = () => {};
        return { onCancel, onCreate, modelRef };
    },
};
</script>
<style scoped lang="scss"></style>
