<template>
    <div>
        <Row>
            <Col><div class="card-head-title">Nhà phân phối và kênh phân phối</div></Col>
        </Row>
        <!-- <div v-for="(cert, idx) in modelRef.certifications" :key="idx"> -->
        <Card body-style="padding: 20px ">
            <Table :data-source="modelRef.distributors" :columns="columns" :pagination="false">
                <template #bodyCell="{ column, index }">
                    <template v-if="column.dataIndex === 'organization'">
                        <FormItem style="margin-bottom: 0">
                            <Select
                                v-model:value="modelRef.distributors[index].organization"
                                :options="[{ label: 'NPP', value: 'NPP' }]"
                            />
                        </FormItem>
                    </template>
                    <template v-if="column.dataIndex === 'channel'">
                        <FormItem style="margin-bottom: 0">
                            <Select
                                v-model:value="modelRef.distributors[index].channel"
                                :options="[
                                    { label: 'KPP1', value: 'KPP1' },
                                    { label: 'KPP2', value: 'KPP2' },
                                ]"
                                mode="multiple"
                            />
                        </FormItem>
                    </template>
                    <template v-if="column.dataIndex === 'action'">
                        <Button danger type="link" style="cursor: pointer" @click="remove(index)">
                            <template #icon>
                                <DeleteOutlined />
                            </template>
                        </Button>
                    </template>
                </template>
                <template #footer>
                    <Button type="link" style="cursor: pointer" @click="add">
                        <template #icon>
                            <PlusOutlined />
                        </template>
                        Thêm nhà phân phối
                    </Button>
                </template>
            </Table>
        </Card>
    </div>
    <!-- </div> -->
</template>

<script setup>
import { inject } from 'vue';
import { useStore } from 'vuex';
import { Card, Input, Form, Upload, DatePicker, Row, Col, Button, Select, Table } from 'ant-design-vue';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons-vue';
const { Item: FormItem } = Form;

const store = useStore();
const modelRef = inject('modelRef');
// const form = inject('form');
// const modelRef = inject('modelRef');
// const { validateInfos } = form;

const columns = [
    {
        title: 'Nhà phân phối',
        dataIndex: 'organization',
        key: 'organization',
    },
    {
        title: 'Kênh phân phối',
        dataIndex: 'channel',
        key: 'channel',
    },
    {
        title: '',
        dataIndex: 'action',
        key: 'action',
    },
];
const add = () => {
    modelRef.distributors.push({
        organization: null,
        channel: [],
    });
};
const remove = index => {
    console.log('index', index);
    modelRef.distributors.splice(index, 1);
};
</script>
