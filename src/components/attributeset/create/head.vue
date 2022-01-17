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
import { computed, h, inject, watch, toRaw, ref } from 'vue';
import { useCreate } from '@/composables/attributeset/create';
import { useStore } from 'vuex';
import { groupByItem } from '@/utils/common';

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

        const errorIds = ref([]);

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
                var index = modelRef.value.attributes.findIndex(_ => !_.id);
                if (index >= 0) {
                    message.warning('Vui lòng kiểm tra lại danh sách thuộc tính');
                    return;
                }

                // kiểm tra attribute có chung group
                errorIds.value = [];
                const key = 'groupName';
                const listItems = groupByItem(modelRef.value.attributes, key);
                if (listItems) {
                    let objects = Object.values(listItems);
                    if (objects && objects.length > 0) {
                        objects = objects.filter(f => f.length >= 2);
                        objects.forEach(element => {
                            let first = undefined;
                            element.forEach((el, index) => {
                                if (el.attributePosition) {
                                    if (index === 0) {
                                        first = el.attributePosition.key;
                                    } else {
                                        if (el.attributePosition.key !== first) {
                                            errorIds.value = [...errorIds.value, ...element.map(m => m.id)];
                                        }
                                    }
                                }
                            });
                        });
                    }
                }
            }
            if (errorIds.value && errorIds.value.length > 0) {
                message.error('Thuộc tính cùng nhóm phải chung vị trí');
                gotoError();
                return;
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
                                h('a', { href: `/attribute-set/${result.value}` }, `#${result.value}`),
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

        const gotoError = () => {
            store.commit('attributeSet/setAttributeIdsError', Object.values(errorIds.value));
            const id = setTimeout(() => {
                errorIds.value = [];
                store.commit('attributeSet/setAttributeIdsError', []);
                clearTimeout(id);
            }, 3000);
        };
        return { onCancel, onCreate, modelRef, isEnableSave, loading };
    },
};
</script>
<style scoped lang="scss"></style>
