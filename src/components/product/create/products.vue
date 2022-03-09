<template>
    <div style="width: 100%; padding-right: 1.6rem">
        <div class="card-head-title">Danh sách sản phẩm</div>
        <Card>
            <FormItem v-bind="validateInfos['product.items']" style="margin-bottom: 0; width: 100%">
                <Dropdown
                    :trigger="['click']"
                    :overlay-style="{ maxHeight: '500px', overflowY: 'auto', boxShadow: '0 2px 8px #00000026' }"
                >
                    <Input v-model:value="searchKey" placeholder="Nhập tên sản phẩm" @change="onChange">
                        <template #suffix>
                            <SearchOutlined style="color: rgba(0, 0, 0, 0.25)" />
                        </template>
                    </Input>
                    <template v-if="productSuggestion || loading" #overlay>
                        <ul v-if="loading" class="menu">
                            <li class="item">
                                <Spin />
                            </li>
                        </ul>
                        <ul v-else class="menu">
                            <li v-for="(product, idx) in productSuggestion" :key="idx" class="item">
                                <Row justify="space-between" @click="() => onSelect(product.value)">
                                    <Col>
                                        <div class="font-600">{{ product.label }}</div>
                                        <div style="color: #1890ff">#{{ product.value }}</div>
                                    </Col>
                                    <Col align="right">
                                        <div>Giá bán tại web</div>
                                        <span class="font-18 font-bold">
                                            <Currency :value="product.extra.price" />
                                        </span>
                                    </Col>
                                </Row>
                            </li>
                        </ul>
                    </template>
                </Dropdown>
            </FormItem>
            <br />
            <Table
                bordered
                :data-source="productItems"
                :columns="columnsCreate"
                :pagination="{ hideOnSinglePage: true }"
            >
                <template #product="{ record }">
                    <a class="font-bold" href="#">{{ record.productName }}</a>
                    <div>
                        <a href="#">{{ record.productCode }}</a>
                    </div>
                </template>
                <template #quantity="{ record }">
                    <CounterButton :value="record.quantity" @change="value => onChangeQty(record, value)" />
                </template>
                <template #price="{ record }">
                    <Currency class="font-bold" :value="record.price" />
                </template>
                <template #total="{ record }">
                    <Currency
                        class="font-bold"
                        :value="
                            record.discount > 100
                                ? record.quantity * record.price - record.discount
                                : (record.quantity * record.price * (100 - record.discount)) / 100
                        "
                    />
                </template>
                <template #action="{ record }">
                    <Button type="primary" danger @click="() => onRemoveProduct(record.productCode)"> Xoá</Button>
                </template>
                <template v-if="sumQuanlity" #footer>
                    <Row>
                        <Col style="width: 300px">
                            <strong>Tổng cộng</strong>
                        </Col>
                        <Col style="width: 200px; text-align: end">
                            {{ sumQuanlity }}
                        </Col>
                        <Col style="width: 150px; text-align: end">
                            <Currency class="font-bold" :value="sumPrice" />
                        </Col>
                        <Col style="width: 150px" />
                    </Row>
                </template>
            </Table>
        </Card>
    </div>
</template>

<script>
import { computed, ref, toRaw, inject } from 'vue';
import { useStore } from 'vuex';
import { Card, Table, Spin, Row, Col, Form, Dropdown, Input, Button } from 'ant-design-vue';
import { SearchOutlined } from '@ant-design/icons-vue';
import { columnsCreate } from '@/composables/product/configs';
import Currency from '@/components/common/currency.vue';
import CounterButton from '@/components/common/counterButton.vue';
import { useGetProduct } from '@/composables/product/common';
import { debounce } from 'lodash/fp';
import { ORDER_TYPE_TO_SALES_CHANNEL } from '@/constants';

const { Item: FormItem } = Form;

export default {
    name: 'OrderDetailGeneral',
    components: {
        Card,
        Table,
        Currency,
        Spin,
        Row,
        Col,
        FormItem,
        CounterButton,
        Dropdown,
        Input,
        SearchOutlined,
        Button,
    },
    setup() {
        const form = inject('form');
        const searchKey = ref('');
        const { validateInfos } = form;
        const store = useStore();
        const productSelected = ref(null);
        const visible = ref(false);
        const onVisible = () => {
            visible.value = true;
        };
        const productItems = computed(() =>
            store.state.product.create.data.product.items.map((item, idx) => ({
                ...item,
                id: idx + 1,
            }))
        );

        const sumPrice = computed(() =>
            store.state.product.create.data.product.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
        );

        const sumQuanlity = computed(() =>
            store.state.product.create.data.product.items.reduce((sum, item) => sum + item.quantity, 0)
        );

        const orderType = computed(() => store.state.product.create.data.orderType);
        const { getProduct, result: productSuggestion, loading, resetter } = useGetProduct();

        const getColor = (quantity, available) => (quantity > available ? 'red' : 'rgb(66, 168, 113)');

        const onSearch = debounce(300)(key =>
            getProduct({ key, saleChannel: ORDER_TYPE_TO_SALES_CHANNEL[orderType.value] })
        );

        const onChange = e => onSearch(e.target.value);

        const onChangeQty = (record, quantity) => {
            const { productCode } = record;

            if (quantity < 0 || !Number.isInteger(quantity)) {
                return;
            } else if (quantity === 0) {
                store.dispatch('product/removeProductItem', { productCode });
            } else {
                store.dispatch('product/updateProductItemQuantity', { productCode, quantity });
            }
        };

        const onChangeDiscount = (record, discount) => {
            const { productCode } = record;

            if (discount < 0 || !Number.isInteger(discount)) {
                return;
            } else {
                store.dispatch('product/updateProductItemDiscount', { productCode, discount });
            }
        };

        const onRemoveProduct = productCode => {
            store.dispatch('product/removeProductItem', { productCode });
        };

        const onSelect = value => {
            const foundProduct = productSuggestion.value.find(_ => _.value === value);
            if (foundProduct) {
                store.dispatch('product/addProductItem', toRaw(foundProduct.extra));
            }
            searchKey.value = '';
            resetter();
        };

        return {
            productItems,
            columnsCreate,
            getColor,
            productSelected,
            onSearch,
            visible,
            productSuggestion,
            loading,
            onSelect,
            onChangeQty,
            validateInfos,
            onChangeDiscount,
            searchKey,
            onChange,
            onVisible,
            onRemoveProduct,
            sumPrice,
            sumQuanlity,
        };
    },
};
</script>

<style lang="scss" scoped>
.menu {
    background: #fff;
    padding: 4px 0;
    margin: 0;

    .item {
        padding: 5px 12px;
        cursor: pointer;

        &:hover {
            background: rgba(0, 0, 0, 0.05);
        }
    }
}
</style>
