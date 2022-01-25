<template>
    <div>
        <Row>
            <Col><div class="card-head-title">Nhà phân phối và kênh phân phối</div></Col>
        </Row>
        <Card body-style="padding: 20px ">
            <Table :data-source="modelRef.distributors" :columns="columns" :pagination="false">
                <template #bodyCell="{ column, index }">
                    <template v-if="column.dataIndex === 'manufacturer'">
                        <ManufacturerLabel :value="modelRef.distributors[index].manufacturer" />
                    </template>
                    <template v-if="column.dataIndex === 'distributor'">
                        {{ modelRef.distributors[index].distributor.join }}
                    </template>
                    <template v-if="column.dataIndex === 'status'">
                        {{ getDistributorStatus(modelRef.distributors[index].manufacturer) }}
                    </template>
                </template>
            </Table>
        </Card>
    </div>
    <!-- </div> -->
</template>

<script setup>
import { computed, inject, toRaw } from 'vue';
import { useStore } from 'vuex';
import { Card, Descriptions, Row, Col, Button, Select, Table } from 'ant-design-vue';
import ManufacturerLabel from '@/components/product/materials/manufacturerLabel';

const { Item: DescriptionsItem } = Descriptions;

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
];

const getDistributorStatus = value => {
    const found = manufacturerOptions.value.find(_ => _.value === toRaw(value));
    return found.status;
};
</script>
