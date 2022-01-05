<template>
    <div>
        <div class="font-14 font-bold">Thông tin thuộc tính</div>
        <Col
            v-if="modelRef.attributes && modelRef.attributes.length > 0"
            :span="12"
            style="margin-bottom: 0; width: 100%; margin-top: 24px"
            class="AttributeChoose"
        >
            <ul class="AttributeChoose__List">
                <Row v-for="(item, idx) in modelRef.attributes" :key="idx" class="AttributeChoose__List__Item">
                    <Col :span="11" style="padding-right: 20px">
                        <Row>
                            <label>Thuộc tính {{ idx + 1 }}</label>
                        </Row>
                        <Row style="margin-top: 20px">
                            <label v-if="item.attributeName">{{ item.attributeName }}</label>
                            <Input
                                v-model:value="propertiesNew.attributeName"
                                placeholder="Nhập tên thuộc tính"
                                size="large"
                            >
                            </Input>
                        </Row>
                    </Col>
                    <Col :span="11">
                        <Row>
                            <label>Tính chất {{ idx + 1 }}</label>
                        </Row>
                        <Row style="margin-top: 20px">
                            <label v-if="item.nature">{{ item.nature.natureName }}</label>

                            <Select
                                v-else
                                v-model="propertiesNew.nature"
                                label-in-value
                                placeholder="Chọn tính chất thuộc tính"
                                size="large"
                                style="width: 200px"
                            >
                                <Option v-for="nature in natureSuggestion" :key="nature.id" :value="nature.natureName">
                                    {{ nature.natureName }}</Option
                                >
                            </Select>
                        </Row>
                    </Col>
                    <Col :span="2">
                        <Button type="danger" @click="onRemove(item)"><DeleteOutlined /> Xóa</Button>
                    </Col>
                </Row>
            </ul>
        </Col>

        <Col :span="12">
            <FormItem v-bind="validateInfos['attributes']" style="margin-top: 24px">
                <Dropdown
                    :trigger="['click']"
                    :overlay-style="{ maxHeight: '500px', overflowY: 'auto', boxShadow: '0 2px 8px #00000026' }"
                    class="AttributeChoose__Dropdown"
                >
                    <Input v-model:value="searchKey" placeholder="Nhập tên sản phẩm" size="large" @change="onChange">
                        <template #suffix>
                            <SearchOutlined style="color: rgba(0, 0, 0, 0.25)" />
                        </template>
                    </Input>
                    <template v-if="attributeSuggestion || loading" #overlay>
                        <ul v-if="loading" class="AttributeChoose__Dropdown__Menu">
                            <li class="item">
                                <Spin />
                            </li>
                        </ul>
                        <ul v-else class="AttributeChoose__Dropdown__Menu">
                            <Row style="padding: 5px 12px">
                                <Button type="primary" :disabled="isAddProperties" @click="onNewProperties">
                                    <PlusOutlined />
                                    Thêm thuộc tính mới
                                </Button>
                            </Row>
                            <li v-for="(item, idx) in attributeSuggestion" :key="idx" class="item">
                                <Row>
                                    <Checkbox
                                        v-model:value="modelRef.attributes"
                                        :disabled="false"
                                        @change="() => onSelect(item)"
                                        >{{ item.attributeName }}</Checkbox
                                    >
                                </Row>
                            </li>
                        </ul>
                    </template>
                </Dropdown>
            </FormItem>
        </Col>
    </div>
</template>
<script>
import { Input, Form, Dropdown, Col, Spin, Checkbox, Button, Row, Modal, Select } from 'ant-design-vue';
import { SearchOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import { useStore } from 'vuex';
import { computed, inject, ref, toRaw } from 'vue';
import { useProperties } from '@/composables/attribute/create';
import { debounce } from 'lodash/fp';

const { Item: FormItem } = Form;
const { Option } = Select;

export default {
    components: {
        Input,
        FormItem,
        Dropdown,
        SearchOutlined,
        Spin,
        Checkbox,
        Col,
        Button,
        DeleteOutlined,
        Row,
        Select,
        Option,
        PlusOutlined,
    },
    setup() {
        const store = useStore();
        const modelRef = inject('modelRef');
        const validateInfos = inject('validateInfos');

        const lstProperties = ref([]);
        const searchKey = ref('');
        const propertiesNew = ref({});

        const isAddProperties = computed(() => {
            var exits = modelRef.value.attributes.findIndex(_ => _.id === 0);
            if (exits < 0) {
                return false;
            }
            return true;
        });

        const {
            getProperties,
            result: attributeSuggestion,
            resultNature: natureSuggestion,
            loading,
            getNature,
        } = useProperties();

        getNature();
        const onCreateProps = () => {};

        const onSearch = debounce(300)(key => getProperties(key));

        const onChange = e => onSearch(e.target.value);

        const onSelect = value => {
            const foundAttribute = attributeSuggestion.value.find(_ => _.id === value.id);
            if (foundAttribute) {
                store.dispatch('attribute/addAttribute', toRaw(foundAttribute));
            }
            searchKey.value = '';
        };

        const onRemove = item => {
            Modal.confirm({
                title: 'Bạn có muốn xóa thuộc tính này khỏi nhóm?',
                content: '',
                okText: 'Xác nhận',
                cancelText: 'Đóng',
                centered: true,
                onOk() {
                    removeProperties(item);
                },
            });
        };

        const removeProperties = item => {
            store.dispatch('attribute/removeAttribute', item);
        };

        const onChangeNature = (value, e) => {
            debugger;
        };

        const onNewProperties = () => {
            var exits = modelRef.value.attributes.findIndex(_ => _.id === 0);
            if (exits < 0) {
                const properties = {
                    id: 0,
                    attributeName: undefined,
                    nature: undefined,
                };
                store.dispatch('attribute/addAttribute', properties);
            }
        };
        return {
            modelRef,
            validateInfos,
            onCreateProps,
            lstProperties,
            searchKey,
            onChange,
            attributeSuggestion,
            loading,
            onSelect,
            onRemove,
            natureSuggestion,
            onChangeNature,
            onNewProperties,
            propertiesNew,
            isAddProperties,
        };
    },
};
</script>
<style lang="scss">
.AttributeChoose {
    &__Dropdown {
        &__Menu {
            background: #fff;
            padding: 4px 0;
            margin: 0;

            .item {
                padding: 5px 12px;
                cursor: pointer;
            }
        }
    }

    &__List {
        padding: 0;

        .ant-row {
            :nth-child(1) {
                label {
                    font-weight: bold;
                }
            }

            :nth-child(2) {
                label {
                    margin-left: 20px;
                    font-weight: normal;
                }
            }
        }

        &__Item {
            margin-bottom: 20px;

            &:last-child {
                margin-bottom: 0;
            }
        }
    }
}
</style>
