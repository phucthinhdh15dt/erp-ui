<template>
    <div>
        <Row>
            <Col><div class="card-head-title">Nhà sản xuất và kênh phân phối</div></Col>
        </Row>
        <!-- <div v-for="(cert, idx) in modelRef.certifications" :key="idx"> -->
        <Card body-style="padding: 20px ">
            <Table :data-source="modelRef.distributors" :columns="columns" :pagination="false">
                <template #bodyCell="{ column, index }">
                    <template v-if="column.dataIndex === 'manufacturer'">
                        <FormItem style="margin-bottom: 0">
                            <Select
                                v-model:value="modelRef.distributors[index].manufacturer"
                                :options="manufacturerOptions"
                            />
                        </FormItem>
                    </template>
                    <template v-if="column.dataIndex === 'distributor'">
                        <FormItem style="margin-bottom: 0">
                            <Select
                                v-model:value="modelRef.distributors[index].distributor"
                                :options="distributorOptions"
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
import { computed, inject } from 'vue';
import { useStore } from 'vuex';
import { Card, Input, Form, Upload, DatePicker, Row, Col, Button, Select, Table } from 'ant-design-vue';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons-vue';
const { Item: FormItem } = Form;

const store = useStore();
const modelRef = inject('modelRef');
// const form = inject('form');
// const modelRef = inject('modelRef');
// const { validateInfos } = form;
const props = defineProps({
    attributes: {
        type: Object,
        default: () => {},
    },
});

const manufacturerOptions = computed(() => store.state.manufacturer.list);
const distributorOptions = computed(() => store.state.distributor.list);

const columns = [
    {
        title: 'Nhà sản xuất',
        dataIndex: 'manufacturer',
        key: 'manufacturer',
    },
    {
        title: 'Kênh phân phối',
        dataIndex: 'distributor',
        key: 'distributor',
    },
    {
        title: '',
        dataIndex: 'action',
        key: 'action',
    },
];
const add = () => {
    modelRef.distributors.push({
        manufacturer: null,
        distributor: [],
    });
};
const remove = index => {
    console.log('index', index);
    modelRef.distributors.splice(index, 1);
};
</script>
