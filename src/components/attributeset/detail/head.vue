<template>
    <Row justify="space-between" class="AttributeSetEditHead">
        <div class="font-18 font-bold">Tên nhóm thuộc tính: {{ modelRef.name }}</div>
        <div class="mb-12">
            <Button v-if="!isEdit" type="primary" class="mr-12 edit" @click="onEdit"><EditOutlined />Chỉnh sửa</Button>
            <Button v-if="!isEdit" type="primary" danger @click="onRemove"><DeleteOutlined />Xóa</Button>

            <Button v-if="isEdit" type="primary" danger class="mr-12" @click="onCancel"><EditOutlined />Hủy bỏ</Button>
            <Button v-if="isEdit" :disabled="!isShowSave" type="primary" @click="onSave"
                ><CheckCircleOutlined />Xác nhận</Button
            >
        </div>
    </Row>
</template>
<script>
import { Row, Button, Modal, message } from 'ant-design-vue';
import { DeleteOutlined, EditOutlined, CheckCircleOutlined } from '@ant-design/icons-vue';
import { inject, computed, watch } from 'vue';
import { useRemoveAttribute, useGetAttribute } from '@/composables/attributeset/create';
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
        const attributeId = inject('attributeId');
        const form = inject('form');
        const { validate } = form;

        const isEdit = computed(() => store.state.attribute.detail.isEdit);
        const modelRef = computed(() => store.state.attribute.detail.data);
        const isShowSave = computed(() => {
            const index = modelRef.value.attributes.findIndex(
                _ => !_.id || !_.attributeName || !_.nature || (!_.nature.key && !_.nature.id)
            );
            if (index < 0) return true;
            return false;
        });

        const { result, removeAttributeId } = useRemoveAttribute();
        const { getUpdateAttribute } = useGetAttribute();

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
            removeAttributeId(attributeId.value);
        };

        watch(
            () => result.value,
            () => {
                if (result.value) {
                    router.push({ path: 'attribute' });
                }
            }
        );

        const onEdit = () => {
            store.commit('attribute/setDetailIsEdit', !isEdit.value);
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
            debugger;
            if (modelRef.value.attributes.length >= 0) {
                const exits = modelRef.value.attributes.filter(_ => !_.id || _.id <= 0);
                if (exits) {
                    const index = modelRef.value.attributes.findIndex(
                        _ => !_.id || !_.attributeName || !_.nature || (!_.nature.key && !_.nature.id)
                    );
                    if (index >= 0) {
                        message.warning('Vui lòng kiểm tra lại danh sách thuộc tính');
                        return;
                    }
                }
            }
            validate().then(() => {
                Modal.confirm({
                    title: 'Bạn có muốn lưu thông tin đã chỉnh sửa?',
                    content: '',
                    okText: 'Xác nhận',
                    cancelText: 'Đóng',
                    centered: true,
                    onOk: getUpdateAttribute,
                });
            });
        };

        return {
            onRemove,
            onEdit,
            isEdit,
            onCancel,
            onSave,
            modelRef,
            isShowSave,
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
