<template>
    <div>
        <div class="card-head-title">Biến thể của sản phẩm</div>
        <Card body-style="padding: 0">
            <Table :data-source="modelRef.variants" :pagination="false">
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
                <Column key="action" title="">
                    <template #default>
                        <Button danger type="link" style="cursor: pointer" @click="remove(index)">
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
    </div>
</template>

<script setup>
import { computed, inject, toRefs } from 'vue';
import { useStore } from 'vuex';
import { Card, Table, Form, Select, Button } from 'ant-design-vue';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons-vue';

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
    store.commit('product/addVariant', defaultData.value);
};

const remove = index => {
    store.commit('product/removeVariant', { index });
};

const onChange = (field, index, value) => {
    store.commit('product/setVariantData', { field, index, value });
};
</script>
