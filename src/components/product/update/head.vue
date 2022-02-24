<template>
    <Row justify="space-between">
        <div class="card-head-title font-18 font-bold">Chỉnh sửa sản phẩm</div>
        <div class="mt-12">
            <Space>
                <Button type="primary" :class="fixed ? 'fixed' : ''" @click="onReset">Khôi phục</Button>
                <Button type="primary" class="confirm" :class="fixed ? 'fixed' : ''" @click="onUpdate">
                    Hoàn tất
                </Button>
            </Space>
        </div>
    </Row>
</template>

<script setup>
import { watch, inject, ref, toRaw } from 'vue';
import { Row, Button, Modal, Space } from 'ant-design-vue';
import { useUpsertProduct } from '@/composables/product';
import { useRouter } from 'vue-router';

const router = useRouter();
const form = inject('form');
const modelRef = inject('modelRef');
const { validate, clearValidate } = form;
const { updateProduct, result } = useUpsertProduct();

const fixed = ref(false);

const onUpdate = () => {
    clearValidate();

    validate()
        .then(() => {
            const data = toRaw(modelRef.value);
            Modal.confirm({
                title: 'Xác nhận cập nhật sản phẩm',
                content: '',
                okText: 'Xác nhận',
                cancelText: 'Đóng',
                centered: true,
                onOk: () => updateProduct(data),
            });
        })
        .catch(error => {
            console.log('error', error);
        });
};

const onReset = () => {
    window.location.reload();
};

const handleScroll = () => {
    const scrollY = window.scrollY;

    if (scrollY >= 70 && !fixed.value) {
        fixed.value = true;
    } else if (scrollY < 70) {
        fixed.value = false;
    }
};
window.addEventListener('scroll', handleScroll);

watch(
    () => result,
    () => {
        if (result.value) {
            Modal.info({
                title: 'Cập nhật sản phẩm thành công',
                okText: 'Đóng',
                centered: true,
                onOk: () => {
                    router.push({ name: 'ProductDetail' });
                },
            });
        }
    },
    { deep: true }
);
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
