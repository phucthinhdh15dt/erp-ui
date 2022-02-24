<template>
    <div class="ActionArea">
        <Button type="primary" class="mr-12" @click="onCreate">Tạo mới </Button>
        <Button type="primary" danger :disabled="!selectedRowKeys || selectedRowKeys.length <= 0" @click="onDelete"
            >Xóa</Button
        >
    </div>
</template>

<script>
import { defineComponent, computed, watch, inject } from 'vue';
import { Button, Modal, message } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { useRemoveAttributeSet } from '@/composables/attributeset/create';

export default defineComponent({
    name: 'ActionArea',
    components: { Button },
    setup() {
        const router = useRouter();
        const store = useStore();
        const selectedRowKeys = computed(() => store.state.attributeSet.list.data.selectedRow);
        const { result, removeAttributeSetIds } = useRemoveAttributeSet();
        const onSearch = inject('onSearch');

        const onDelete = () => {
            Modal.confirm({
                title: 'Bạn chắc chắn muốn xóa các nhóm thuộc tính đã chọn?',
                content: 'Lưu ý khi xoá sẽ không khôi phục lại được.',
                okText: 'Xác nhận',
                cancelText: 'Đóng',
                centered: true,
                onOk: removeAttributeList,
            });
        };
        const onCreate = () => {
            router.push('/attribute-set/create');
        };

        const removeAttributeList = () => {
            removeAttributeSetIds(selectedRowKeys.value);
        };

        watch(
            () => result.value,
            () => {
                if (result.value) {
                    message.success('Xóa thông tin thành công');
                    onSearch();
                }
            }
        );

        return {
            onDelete,
            onCreate,
            selectedRowKeys,
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
