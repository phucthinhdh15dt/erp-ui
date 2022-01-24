<template>
    <div>
        <Row>
            <Col><div class="card-head-title">Nhà phân phối và kênh phân phối</div></Col>
        </Row>
        <Card body-style="padding: 20px ">
            <Table :data-source="modelRef.distributors" :columns="columns" :pagination="false">
                <template #bodyCell="{ column, index }">
                    <template v-if="column.dataIndex === 'manufacturer'">
                        <FormItem style="margin-bottom: 0">
                            <Select
                                :value="modelRef.distributors[index].manufacturer"
                                :options="manufacturerOptions"
                                @change="value => onChange('manufacturer', index, value)"
                            />
                        </FormItem>
                    </template>
                    <template v-if="column.dataIndex === 'distributor'">
                        <FormItem style="margin-bottom: 0">
                            <Select
                                :value="modelRef.distributors[index].distributor"
                                mode="multiple"
                                :options="distributorOptions"
                                @change="value => onChange('distributor', index, value)"
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
                    <template v-if="column.dataIndex === 'status'">
                        {{ getDistributorStatus(modelRef.distributors[index].manufacturer) }}
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
import { computed, inject, toRaw } from 'vue';
import { useStore } from 'vuex';
import { Card, Form, Row, Col, Button, Select, Table } from 'ant-design-vue';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons-vue';
const { Item: FormItem } = Form;

const store = useStore();
const modelRef = inject('modelRef');

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
        title: 'Nhà phân phối',
        dataIndex: 'manufacturer',
        key: 'manufacturer',
    },
    {
        title: 'Kênh phân phối',
        dataIndex: 'distributor',
        key: 'distributor',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: '',
        dataIndex: 'action',
        key: 'action',
    },
];

const add = () => {
    store.commit('product/addDistributor');
};

const remove = index => {
    store.commit('product/removeDistributor', { index });
};

const onChange = (field, index, value) => {
    store.commit('product/setDistributorsData', { field, index, value });
};

const getDistributorStatus = value => {
    const found = manufacturerOptions.value.find(_ => _.value === toRaw(value));
    return found.status;
};
</script>
