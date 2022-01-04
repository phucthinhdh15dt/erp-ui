<template>
    <div>
        <div class="font-14 font-bold mb">Thông tin thuộc tính</div>
        <Row class="mt-12">
            <Button type="primary" class="confirm" @click="onCreateProps"> <PlusOutlined />Thêm thuộc tính</Button>
        </Row>
        <ChoosePropertie />
    </div>
</template>
<script>
import { Row, Button } from 'ant-design-vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import { inject } from 'vue';
import ChoosePropertie from '@/components/attribute/create/choose.vue';

export default {
    components: {
        Row,
        Button,
        PlusOutlined,
        ChoosePropertie,
    },
    setup() {
        const modelRef = inject('modelRef');
        const validateInfos = inject('validateInfos');

        const onCreateProps = () => {};
        return {
            modelRef,
            validateInfos,
            onCreateProps,
        };
    },
};
</script>
<style scoped lang="scss"></style>
