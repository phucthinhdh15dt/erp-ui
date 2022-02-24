<template>
    <Row justify="space-between">
        <div class="card-head-title font-18 font-bold">Chi tiết sản phẩm</div>
        <div class="mt-12">
            <Space>
                <router-link :to="`/product/${productId}/update`">
                    <Button type="primary" class="confirm" :class="fixed ? 'fixed' : ''"> Chỉnh sửa </Button>
                </router-link>
            </Space>
        </div>
    </Row>
</template>

<script setup>
import { inject, ref } from 'vue';
import { Row, Button, Space } from 'ant-design-vue';

const productId = inject('productId');

const fixed = ref(false);

const handleScroll = () => {
    const scrollY = window.scrollY;

    if (scrollY >= 70 && !fixed.value) {
        fixed.value = true;
    } else if (scrollY < 70) {
        fixed.value = false;
    }
};
window.addEventListener('scroll', handleScroll);
</script>

<style lang="scss">
.confirm {
    background-color: #00bc80 !important;
    border-color: #00bc80 !important;

    &:hover {
        opacity: 0.9;
    }

    &.fixed {
        position: fixed;
        z-index: 4;
        top: 8px;
        right: 250px;
    }
}

.cancel {
    background: #ca3d3d !important;
    border-color: #ca3d3d !important;

    &:hover {
        opacity: 0.9;
    }
}
</style>
