<template>
    <div>
        <div class="card-head-title">Biến thể của sản phẩm</div>
        <Card v-if="isEdit" body-style="padding: 0">
            <Table :data-source="modelRef.variants" :pagination="false">
                <Column key="productCode" title="Product code">
                    <template #default="{ index: dataIndex }">
                        {{ modelRef.variants[dataIndex].productCode }}
                    </template>
                </Column>
                <Column v-for="(column, colIndex) in columns" :key="column.key">
                    <template #title>{{ column.title }}</template>
                    <template #default="{ index: dataIndex }">
                        <FormItem style="margin-bottom: 0">
                            <Select
                                :value="modelRef.variants[dataIndex][column.key]"
                                :options="attributes[colIndex].options"
                                @change="value => onChange(column.key, dataIndex, value)"
                            />
                        </FormItem>
                    </template>
                </Column>
                <Column v-if="isEdit" key="status" title="Trạng thái">
                    <template #default="{ index: dataIndex }">
                        <StatusSelection
                            :value="modelRef.variants[dataIndex].status"
                            @change="value => onChange('status', dataIndex, value)"
                        />
                    </template>
                </Column>
                <Column key="action" title="">
                    <template #default="{ index: dataIndex }">
                        <Button danger type="link" style="cursor: pointer" @click="remove(dataIndex)">
                            <template #icon>
                                <DeleteOutlined />
                            </template>
                        </Button>
                    </template>
                </Column>
                <template #footer>
                    <Button type="link" style="cursor: pointer" @click="add">
                        <template #icon>
                            <PlusOutlined />
                        </template>
                        Thêm biến thể
                    </Button>
                </template>
            </Table>
        </Card>

        <Card v-else>
            <FormItem
                v-for="(column, colIndex) in columns"
                :key="column.key"
                :label="column.title"
                class="form-label-w-18"
            >
                <Select
                    :value="modelRef.variants[column.key]"
                    :options="attributes[colIndex].options"
                    mode="multiple"
                    @change="value => onChangeCreate(column.key, colIndex, value)"
                />
            </FormItem>
        </Card>
    </div>
</template>

<script setup>
import { computed, inject, toRefs, toRaw } from 'vue';
import { useStore } from 'vuex';
import { Card, Table, Form, Select, Button } from 'ant-design-vue';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons-vue';
import StatusSelection from '../materials/statusSelection.vue';

const { Column } = Table;
const { Item: FormItem } = Form;

const props = defineProps({
    attributes: {
        type: Array,
        default: () => [],
    },
});
const { attributes } = toRefs(props);
const modelRef = inject('modelRef');
const isEdit = inject('isEdit');

const store = useStore();

const columns = computed(() => [
    ...attributes.value.map(_ => ({
        title: _.label,
        dataIndex: _.code,
        key: _.code,
    })),
]);

const defaultData = computed(() =>
    columns.value.reduce((acc, cur) => {
        acc[cur.key] = null;

        return acc;
    }, {})
);
const add = () => {
    store.commit('product/addVariant', toRaw(defaultData.value));
};

const remove = index => {
    store.commit('product/removeVariant', { index });
};

const onChangeCreate = (field, index, value) => {
    store.commit('product/setVariantDataCreate', { field, index, value });
};

const onChange = (field, index, value) => {
    store.commit('product/setVariantData', { field, index, value });
};
</script>
