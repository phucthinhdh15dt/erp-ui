<template>
    <div>
        <div class="card-head-title">Biến thể của sản phẩm</div>
        <Card body-style="padding: 0">
            <Table :data-source="modelRef.variants" :pagination="false">
                <Column v-for="column in columns" :key="column.key">
                    <template #title>{{ column.title }}</template>
                    <template #default="{ index: dataIndex }">
                        {{ modelRef.variants[dataIndex][column.key] }}
                    </template>
                </Column>
                <Column key="status" title="Trạng thái">
                    <template #default="{ index: dataIndex }">
                        <StatusTags :value="modelRef.variants[dataIndex].status" />
                    </template>
                </Column>
            </Table>
        </Card>
    </div>
</template>

<script setup>
import { computed, inject, toRefs } from 'vue';
import { Card, Table } from 'ant-design-vue';
import StatusTags from '../materials/statusTags.vue';

const { Column } = Table;

const props = defineProps({
    attributes: {
        type: Array,
        default: () => [],
    },
});
const { attributes } = toRefs(props);
const modelRef = inject('modelRef');

const columns = computed(() => [
    { title: 'Product code', dataIndex: 'productCode', key: 'productCode' },
    ...attributes.value.map(_ => ({
        title: _.label,
        dataIndex: _.code,
        key: _.code,
    })),
]);
</script>

