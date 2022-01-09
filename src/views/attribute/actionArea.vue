<template>
    <div class="ActionArea">
        <Button type="primary" class="mr-12" @click="onCreate"><PlusOutlined /> Tạo mới </Button>
        <Button type="primary" danger @click="onDelete"><EditOutlined />Xóa</Button>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { Button } from 'ant-design-vue';
import { EditOutlined, PlusOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'ActionArea',
    components: { Button, EditOutlined, PlusOutlined },
    setup() {
        const router = useRouter();
        const onDelete = () => {};
        const onCreate = () => {
            router.push('/attribute/create');
        };
        return { onDelete, onCreate };
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
