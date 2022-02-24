<template>
    <Row>
        <Col><div class="card-head-title">Giấy chứng nhận</div></Col>
        <Col>
            <Button v-if="showEdit" type="link" class="mt-14" @click="onEdit">
                <template #icon><EditOutlined /></template>
                Chỉnh sửa
            </Button>
        </Col>
    </Row>
    <List size="small" :data-source="modelRef.certifications">
        <template #renderItem="{ index }">
            <Space>
                <Card body-style="padding: 0">
                    <ListItem style="padding: 0 !important">
                        <Descriptions :column="1">
                            <DescriptionsItem label="Số công bố" class="label-width-18 border-bottom">
                                <div>{{ modelRef.certifications[index].certificateId }}</div>
                            </DescriptionsItem>
                            <DescriptionsItem label="Ngày công bố" class="label-width-18 border-bottom">
                                <Datetime :value="modelRef.certifications[index].publishDate"></Datetime>
                            </DescriptionsItem>
                            <DescriptionsItem label="Hình ảnh" class="label-width-18 mb-0">
                                <Avatar shape="square" :src="modelRef.certifications[index].images" size="large" />
                            </DescriptionsItem>
                        </Descriptions>
                    </ListItem>
                </Card>
            </Space>
        </template>
    </List>
</template>

<script setup>
import { inject } from 'vue';
import { Card, Descriptions, Avatar, Row, Col, Button, List, Space } from 'ant-design-vue';
import Datetime from '@/components/common/datetime.vue';
const { Item: DescriptionsItem } = Descriptions;
const { Item: ListItem } = List;

const modelRef = inject('modelRef');
</script>
