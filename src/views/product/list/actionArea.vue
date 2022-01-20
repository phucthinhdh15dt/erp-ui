<template>
    <div class="ActionArea">
        <Button type="primary" @click="createProduct"> Tạo mới </Button>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { Button } from 'ant-design-vue';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'ActionArea',
    components: {
        Button,
    },
    setup() {
        const router = useRouter();
        const createProduct = () => {
            router.push('/product/create');
        };
        return {
            createProduct,
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
