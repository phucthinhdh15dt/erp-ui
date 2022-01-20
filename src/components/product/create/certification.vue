<template>
    <div>
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
                        <template #extra>
                            <Button danger type="link" style="cursor: pointer" @click="remove(index)">
                                <template #icon>
                                    <DeleteOutlined />
                                </template>
                            </Button>
                        </template>
                        <Form label-align="left" style="width: 100%">
                            <FormItem label="Số công bố" class="form-label-w-18">
                                <Input v-model:value="modelRef.certifications[index].certificateId" />
                            </FormItem>
                            <FormItem label="Ngày công bố" class="form-label-w-18">
                                <DatePicker v-model:value="modelRef.certifications[index].publishDate" />
                            </FormItem>
                            <FormItem label="Hình ảnh" class="form-label-w-18 mb-0">
                                <Upload
                                    v-model:fileList="modelRef.certifications[index].images"
                                    list-type="picture-card"
                                    name="files"
                                    action="/upload.do"
                                >
                                    <div>
                                        <PlusOutlined />
                                        <div class="ant-upload-text">Thêm ảnh</div>
                                    </div>
                                </Upload>
                            </FormItem>
                        </Form>
                    </ListItem>
                </template>
            </List>
            <Button type="link" style="cursor: pointer" @click="add">
                <template #icon>
                    <PlusOutlined />
                </template>
                Thêm giấy chứng nhận
            </Button>
        </Card>
    </div>
</template>

<script setup>
import { inject } from 'vue';
import { useStore } from 'vuex';
import { Card, Input, Form, Upload, DatePicker, Row, Col, Button, List } from 'ant-design-vue';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons-vue';
const { Item: FormItem } = Form;
const { Item: ListItem } = List;

const store = useStore();
const modelRef = inject('modelRef');
// const form = inject('form');
// const modelRef = inject('modelRef');
// const { validateInfos } = form;

const add = e => {
    modelRef.certifications.push({
        certificateId: '',
        publishDate: null,
        images: [],
    });
};
const remove = index => {
    console.log('index', index);
    modelRef.certifications.splice(index, 1);
};
</script>
