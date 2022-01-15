<template>
    <div class="ActionArea">
        <Button type="primary" class="mr-12" @click="onCreateNew"><PlusOutlined /> Tạo mới </Button>
        <!-- <Button type="primary" danger :disabled="!selectedRowKeys || selectedRowKeys.length <= 0" @click="onDelete"
            ><EditOutlined />Ngưng hoạt động</Button
        > -->
        <Brand />
    </div>
</template>

<script>
import { defineComponent, computed, watch, inject, ref } from 'vue';
import { Button, Modal, message } from 'ant-design-vue';
import { EditOutlined, PlusOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { useRemoveAttributeSet } from '@/composables/attributeset/create';
import Brand from '@/components/brand';

export default defineComponent({
    name: 'ActionArea',
    components: {
        Button,
        PlusOutlined,
        Brand,
    },
    setup() {
        const router = useRouter();
        const store = useStore();
        const selectedRowKeys = computed(() => store.state.list.selectedRow);
        const { result, removeAttributeSetIds } = useRemoveAttributeSet();
        const onSearch = inject('onSearch');
        const isOpen = computed(() => store.state.brand.isOpen);

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
        const onCreateNew = () => {
            store.commit('brand/resetBrandData');
            store.commit('brand/setIsOpen', !isOpen.value);
        };

        const removeAttributeList = () => {
            debugger;
            removeAttributeSetIds(selectedRowKeys.value);
        };

        watch(
            () => result.value,
            () => {
                if (result.value) {
                    message.success('Cập nhật thương hiệu thành công');
                    onSearch();
                }
            }
        );

        return {
            onCreateNew,
            onDelete,
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
