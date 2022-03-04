<template>
    <Row justify="space-between">
        <div class="card-head-title font-18 font-bold">Tạo combo</div>
        <div class="mt-12">
            <Button type="primary" class="confirm" :class="fixed ? 'fixed' : ''" @click="onCreate"
                >Tạo combo</Button
            >
        </div>
    </Row>
</template>

<script setup>
import { h, watch, inject, ref, toRaw, computed } from 'vue';
import { Row, Button, Modal } from 'ant-design-vue';
import { useUpsertProduct } from '@/composables/product';
import { without } from 'lodash/fp';
import { useStore } from 'vuex';

const form = inject('form');
const modelRef = inject('modelRef');
const store = useStore();
const { validate, clearValidate } = form;
const { createProduct, result } = useUpsertProduct();

const fixed = ref(false);

const productItems = computed(() =>
    store.state.product.create.data.product.items.map((item) => ({
        code: item.productCode,
        quantity: item.quantity,
    }))
);

const onCreate = () => {
    
    
    console.log("productItems", productItems.value)
    console.log("modelRef", toRaw(modelRef))

    clearValidate();

    validate()
        .then(() => {
            const data = toRaw(modelRef);
            Modal.confirm({
                title: 'Xác nhận tạo sản phẩm',
                content: '',
                okText: 'Xác nhận',
                cancelText: 'Đóng',
                centered: true,
                onOk: () => createProduct(data),
            });
        })
        .catch(error => {
            console.log('error', error);
        });
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
                title: 'Tạo sản phẩm thành công',
                content: () =>
                    h('div', {}, ['Mã sản phẩm ', h('a', { href: `/product/${result.value}` }, `#${result.value}`)]),
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
