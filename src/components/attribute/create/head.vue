<template>
    <Row justify="space-between">
        <div class="card-head-title font-18 font-bold">Nhóm thuộc tính</div>
        <div class="mt-12">
            <Button type="danger" class="cancel mr-12" @click="onCancel">Hủy bỏ</Button>
            <Button type="primary" class="confirm" @click="onCreate">Xác nhận</Button>
        </div>
    </Row>
</template>
<script>
import { Row, Button } from 'ant-design-vue';

export default {
    components: {
        Button,
        Row,
    },
    setup() {
        const onCancel = () => {};
        const onCreate = () => {};
        return { onCancel, onCreate };
    },
};
</script>
<style scoped lang='scss'>

</style>
