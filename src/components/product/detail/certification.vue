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
        <Card body-style="padding: 0 20px 20px 20px">
            <List size="small" :data-source="modelRef.certifications">
                <template #renderItem="{ index }">
                    <ListItem style="padding-top: 20px">
                        <Descriptions :column="1">
                            <DescriptionsItem label="Số công bố" class="label-width-18">
                                <div>{{ modelRef.certifications[index].certificateId }}</div>
                            </DescriptionsItem>
                            <DescriptionsItem label="Ngày công bố" class="label-width-18">
                                <div>{{ modelRef.certifications[index].publishDate }}</div>
                            </DescriptionsItem>
                            <DescriptionsItem label="Hình ảnh" class="label-width-18 mb-0">
                                <Avatar :src="modelRef.certifications[index].images" size="large" />
                            </DescriptionsItem>
                        </Descriptions>
                    </ListItem>
                </template>
            </List>
        </Card>
    </Spin>
</template>

<script setup>
import { inject, toRaw, watch } from 'vue';
import { useStore } from 'vuex';
import {
    Card,
    Input,
    Descriptions,
    Upload,
    Avatar,
    Row,
    Col,
    Button,
    List,
    Space,
    Tooltip,
    message,
    Spin,
} from 'ant-design-vue';
import { PlusOutlined, EditOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons-vue';
import { useUpdateProductCertification } from '@/composables/certification';
import { pathOr } from 'lodash/fp';

const { Item: DescriptionsItem } = Descriptions;
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
    store.commit('product/setCertificationData', { field, index, value });
};

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
