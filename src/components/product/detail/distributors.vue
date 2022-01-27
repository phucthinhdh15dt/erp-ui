<template>
    <div>
        <Row>
            <Col><div class="card-head-title">Nhà phân phối và kênh phân phối</div></Col>
        </Row>
        <Card body-style="padding: 0">
            <Table :data-source="modelRef.distributors" :columns="columns" :pagination="false">
                <template #bodyCell="{ column, index }">
                    <template v-if="column.dataIndex === 'manufacturer'">
                        <ManufacturerLabel :value="modelRef.distributors[index].manufacturer" />
                    </template>
                    <template v-if="column.dataIndex === 'distributor'">
                        <Space>
                            <DistributorLabel
                                v-for="(distributor, idx) in modelRef.distributors[index].distributor"
                                :key="idx"
                                :value="distributor"
                            />
                        </Space>
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
import { computed, inject, toRaw, watch } from 'vue';
import { useStore } from 'vuex';
import { Card, Descriptions, Row, Col, Space, Table } from 'ant-design-vue';
import ManufacturerLabel from '@/components/product/materials/manufacturerLabel';
import DistributorLabel from '@/components/product/materials/distributorLabel';

const { Item: DescriptionsItem } = Descriptions;

const store = useStore();
const modelRef = inject('modelRef');
watch(
    modelRef,
    () => {
        console.log(modelRef.value);
    },
    { deep: true, immediate: true }
);
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
    return found?.status || '';
};
</script>
