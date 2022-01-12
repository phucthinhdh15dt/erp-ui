<template>
    <Row justify="space-between" class="AttributeSetEditHead">
        <div class="font-18 font-bold">Tên nhóm thuộc tính: {{ modelRef.name }}</div>
        <div class="mb-12">
            <Button v-if="!isEdit" type="primary" class="mr-12 edit" @click="onEdit"><EditOutlined />Chỉnh sửa</Button>
            <Button v-if="!isEdit" type="primary" danger @click="onRemove"><DeleteOutlined />Xóa</Button>

            <Button v-if="isEdit" type="primary" danger class="mr-12" @click="onCancel"><EditOutlined />Hủy bỏ</Button>
            <Button v-if="isEdit" :disabled="!isEnableSave" type="primary" @click="onSave"
                ><CheckCircleOutlined />Xác nhận</Button
            >
        </div>
    </Row>
</template>
<script>
import { Row, Button, Modal, message } from 'ant-design-vue';
import { DeleteOutlined, EditOutlined, CheckCircleOutlined } from '@ant-design/icons-vue';
import { inject, computed, watch } from 'vue';
import { useRemoveAttributeSet, useGetAttributeSet } from '@/composables/attributeset/create';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
    components: {
        Button,
        Row,
        DeleteOutlined,
        EditOutlined,
        CheckCircleOutlined,
    },
    setup() {
        const router = useRouter();
        const store = useStore();
        const attributeSetId = inject('attributeSetId');
        const form = inject('form');
        const { validate } = form;

        const isEdit = computed(() => store.state.attributeSet.detail.isEdit);
        const modelRef = computed(() => store.state.attributeSet.detail.data);
        const isEnableSave = computed(() => {
            const data = store.state.attributeSet.detail.data;
            if (data.category && data.name && data.attributes && data.attributes.length > 0) {
                // const index = data.attributes.findIndex(f => f.id && f.type);
                // if (index < 0) {
                //     return true;
                // }
                return true;
            }
            return false;
        });

        const { result, removeAttributeSetId } = useRemoveAttributeSet();
        const { getUpdateAttributeSet, result: resultUpdate, loading: loadingUpdate } = useGetAttributeSet();

        const onRemove = () => {
            Modal.confirm({
                title: 'Bạn chắc chắn muốn xóa nhóm thuộc tính này?',
                content: 'Lưu ý khi xoá sẽ không khôi phục lại được.',
                okText: 'Xác nhận',
                cancelText: 'Đóng',
                centered: true,
                onOk: removeAttribute,
            });
        };
        const removeAttribute = () => {
            removeAttributeSetId(attributeSetId.value);
        };

        watch(
            () => result.value,
            () => {
                if (result.value) {
                    router.push({ path: '/attributeSet/list' });
                }
            }
        );

        const onEdit = () => {
            store.commit('attributeSet/setDetailIsEdit', !isEdit.value);
        };

        const onCancel = () => {
            Modal.confirm({
                title: 'Bạn sẽ hủy bỏ các thông tin đã sửa?',
                content: 'Lưu ý khi hủy sẽ không khôi phục lại được.',
                okText: 'Xác nhận',
                cancelText: 'Đóng',
                centered: true,
                onOk: reload,
            });
        };
        const reload = () => {
            window.location.reload(true);
        };

        const onSave = () => {
            if (modelRef.value.attributes.length >= 0) {
                var index = modelRef.value.attributes.findIndex(_ => !_.id || !_.layoutPosition || _.attrOrder <= 0);
                if (index >= 0) {
                    message.warning('Vui lòng kiểm tra lại danh sách thuộc tính');
                    return;
                }
            }
            validate().then(() => {
                Modal.confirm({
                    title: 'Bạn có muốn lưu thông tin đã chỉnh sửa?',
                    content: '',
                    okText: 'Xác nhận',
                    cancelText: 'Đóng',
                    centered: true,
                    onOk: getUpdateAttributeSet,
                });
            });
        };

        watch(
            () => resultUpdate.value,
            () => {
                if (resultUpdate.value && !loadingUpdate.value) {
                    message.success('Cập nhật thông tin thành công');
                    setTimeout(() => {
                        window.location.reload(true);
                    }, 500);
                }
            }
        );

        return {
            onRemove,
            onEdit,
            isEdit,
            onCancel,
            onSave,
            modelRef,
            isEnableSave,
        };
    },
};
</script>
<style scoped lang="scss">
.AttributeSetEditHead {
    .edit {
        background: $active-color;
        border: 1px solid $active-color;
    }
}
</style>
