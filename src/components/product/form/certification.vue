<template>
    <Spin :spinning="loading">
        <Row>
            <Col><div class="card-head-title">Giấy chứng nhận</div></Col>
            <Col>
                <Button v-if="showEdit" type="link" class="mt-14" @click="onEdit">
                    <template #icon><EditOutlined /></template>
                    Chỉnh sửa
                </Button>
            </Col>
        </Row>
        <Card body-style="padding: 0 0 20px 0 ">
            <List size="small" :data-source="modelRef.certifications">
                <template #renderItem="{ index }">
                    <ListItem style="padding-top: 20px">
                        <template #extra>
                            <Space>
                                <Tooltip title="Cập nhật">
                                    <Button
                                        v-if="modelRef.certifications[index].id"
                                        type="link"
                                        style="cursor: pointer"
                                        @click="update(index)"
                                    >
                                        <template #icon>
                                            <CheckOutlined />
                                        </template>
                                    </Button>
                                </Tooltip>

                                <Tooltip title="Xóa">
                                    <Button danger type="link" style="cursor: pointer" @click="remove(index)">
                                        <template #icon>
                                            <DeleteOutlined />
                                        </template>
                                    </Button> </Tooltip
                            ></Space>
                        </template>
                        <Form label-align="left" style="width: 100%">
                            <FormItem label="Số công bố" class="form-label-w-18">
                                <Input
                                    :value="modelRef.certifications[index].certificateId"
                                    :disabled="modelRef.certifications[index].id"
                                    @change="e => onChange('certificateId', index, e.target.value)"
                                />
                            </FormItem>
                            <FormItem label="Ngày công bố" class="form-label-w-18">
                                <DatePicker
                                    :value="modelRef.certifications[index].publishDate"
                                    :locale="locale"
                                    @change="value => onChange('publishDate', index, value)"
                                />
                            </FormItem>
                            <FormItem label="Hình ảnh" class="form-label-w-18 mb-0">
                                <Input
                                    :value="modelRef.certifications[index].images"
                                    @change="e => onChange('images', index, e.target.value)"
                                />
                            </FormItem>
                        </Form>
                    </ListItem>
                </template>
            </List>
            <Button type="link" style="cursor: pointer; margin-top: 20px" @click="add">
                <template #icon>
                    <PlusOutlined />
                </template>
                Thêm giấy chứng nhận
            </Button>
        </Card>
    </Spin>
</template>

<script setup>
import { inject, toRaw, watch } from 'vue';
import { useStore } from 'vuex';
import { Card, Input, Form, DatePicker, Row, Col, Button, List, Space, Tooltip, message, Spin } from 'ant-design-vue';
import { PlusOutlined, EditOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons-vue';
import { useUpdateProductCertification } from '@/composables/certification';
import locale from 'ant-design-vue/es/date-picker/locale/vi_VN';

const { Item: FormItem } = Form;
const { Item: ListItem } = List;

const store = useStore();
const modelRef = inject('modelRef');

const { updateProductCertification, result, loading } = useUpdateProductCertification();

const add = () => {
    store.commit('product/addCertification');
};

const remove = index => {
    store.commit('product/removeCertification', { index });
};

const update = index => {
    updateProductCertification(toRaw(modelRef.value.certifications[index]));
};

const onChange = (field, index, value) => {
    console.log({ field, index, value });
    store.commit('product/setCertificationData', { field, index, value });
};

watch(
    modelRef,
    () => {
        console.log('modelRef', modelRef.value);
    },
    { deep: true, immediate: true }
);
watch(
    result,
    () => {
        if (result.value) {
            message.success(result.value);
        }
    },
    { deep: true }
);
</script>
