<template>
    <Row justify="space-between">
        <div class="card-head-title font-18 font-bold">Nhóm thuộc tính</div>
        <div class="mt-12">
            <Button type="primary" danger class="mr-12" :disabled="loading" @click="onCancel">Hủy bỏ</Button>
            <Button type="primary" class="confirm" :disabled="!isEnableSave" @click="onCreate">Xác nhận</Button>
        </div>
    </Row>
</template>
<script>
import { Row, Button, Modal, message } from 'ant-design-vue';
import { computed, h, inject, watch } from 'vue';
import { useCreate } from '@/composables/attributeset/create';
import { useStore } from 'vuex';

export default {
    components: {
        Button,
        Row,
    },
    setup() {
        const store = useStore();
        const modelRef = inject('modelRef');
        const form = inject('form');
        const { validate, resetFields } = form;
        const { result, createAttributeSet, loading } = useCreate();
        const isEnableSave = computed(() => {
            const data = store.state.attributeSet.create.data;
            if (data.category && data.name && data.attributes && data.attributes.length > 0) {
                // const index = data.attributes.findIndex(f => f.id && f.type);
                // if (index < 0) {
                //     return true;
                // }
                return true;
            }
            return false;
        });

        const onCancel = () => {
            Modal.confirm({
                title: 'Bạn có muốn hủy hết thao tác?',
                content: '',
                okText: 'Xác nhận',
                cancelText: 'Đóng',
                centered: true,
                onOk: resetField,
            });
        };
        const resetField = () => {
            resetFields();
        };
        const onCreate = () => {
            if (modelRef.value.attributes.length >= 0) {
                var index = modelRef.value.attributes.findIndex(_ => !_.id || _.attributeOrder <= 0);
                if (index >= 0) {
                    message.warning('Vui lòng kiểm tra lại danh sách thuộc tính');
                    return;
                }
            }
            validate()
                .then(() => {
                    Modal.confirm({
                        title: 'Xác nhận tạo nhóm thuộc tính',
                        content: '',
                        okText: 'Xác nhận',
                        cancelText: 'Đóng',
                        centered: true,
                        onOk: createAttributeSet,
                    });
                })
                .catch(error => {
                    console.log('error', error);
                });
        };

        watch(
            () => result,
            () => {
                if (result.value) {
                    Modal.info({
                        title: 'Tạo nhóm thuộc tính thành công',
                        content: () =>
                            h('div', {}, [
                                'Mã nhóm thuộc tính ',
                                h('a', { href: `/attributeSet/${result.value}` }, `#${result.value}`),
                            ]),
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
        return { onCancel, onCreate, modelRef, isEnableSave, loading };
    },
};
</script>
<style scoped lang="scss"></style>
