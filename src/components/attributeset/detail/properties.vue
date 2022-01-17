<template>
    <div>
        <div class="font-14 font-bold">Thông tin thuộc tính</div>
        <Row>
            <Col
                v-if="modelRef.attributes && modelRef.attributes.length > 0"
                style="margin-bottom: 0; width: 100%; margin-top: 24px"
                class="AttributeSetDetailChoose"
            >
                <ul class="AttributeSetDetailChoose__List">
                    <Row
                        v-for="(item, idx) in modelRef.attributes"
                        :key="idx"
                        class="AttributeSetDetailChoose__List__Item"
                    >
                        <Col :span="5" style="padding-right: 20px">
                            <Row>
                                <label style="font-weight: bold">Thuộc tính {{ idx + 1 }}</label>
                            </Row>
                            <Row v-if="item.attribute" align="bottom" style="margin-top: 20px">
                                <label v-if="!item.isAdd" style="margin-left: 20px">{{ item.attribute.label }}</label>
                                <Input
                                    v-else
                                    v-model:value="item.attribute.label"
                                    placeholder="Nhập tên thuộc tính"
                                    size="large"
                                >
                                </Input>
                            </Row>
                        </Col>
                        <Col :span="3">
                            <Row>
                                <label style="font-weight: bold">Tính chất {{ idx + 1 }}</label>
                            </Row>
                            <Row align="bottom" style="margin-top: 20px">
                                <label>{{ getAttributeItemType(item) }}</label>
                            </Row>
                        </Col>
                        <Col :span="4" style="padding-right: 20px">
                            <Row>
                                <label style="font-weight: bold">Tên nhóm</label>
                            </Row>
                            <Row align="bottom" style="margin-top: 20px">
                                <label v-if="!isEdit">{{ item.group || 'Không rõ' }}</label>
                                <Input v-else v-model:value="item.group" placeholder="Nhập tên nhóm" size="large">
                                </Input>
                            </Row>
                        </Col>
                        <Col :span="2" style="padding-right: 20px">
                            <label style="font-weight: bold">Thứ tự nhóm</label>
                            <Row align="bottom" style="margin-top: 20px">
                                <label v-if="!isEdit">{{ item.groupOrder || 0 }}</label>
                                <InputNumber
                                    v-else
                                    v-model:value="item.groupOrder"
                                    size="large"
                                    :min="1"
                                    :max="10000"
                                    style="width: 100%"
                                    :formatter="
                                        value => `${value}`.replace('.', '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                    "
                                    :parser="value => value.replace('.', '').replace(/\$\s?|(,*)/g, '')"
                                    :step="1"
                                ></InputNumber>
                            </Row>
                        </Col>
                        <Col :span="2">
                            <label style="font-weight: bold">Số thứ tự</label>
                            <Row align="bottom" style="margin-top: 20px">
                                <label v-if="!isEdit">{{ item.attrOrder || 0 }}</label>
                                <InputNumber
                                    v-else
                                    v-model:value="item.attrOrder"
                                    size="large"
                                    :min="1"
                                    :max="10000"
                                    :formatter="
                                        value => `${value}`.replace('.', '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                    "
                                    :parser="value => value.replace('.', '').replace(/\$\s?|(,*)/g, '')"
                                    :step="1"
                                ></InputNumber>
                            </Row>
                        </Col>
                        <Col :span="3">
                            <label style="font-weight: bold">Vị trí</label>
                            <Row align="bottom" style="margin-top: 20px">
                                <label v-if="!isEdit">{{ getPositionAttributeItem(item) }}</label>

                                <Select
                                    v-else
                                    v-model:value="item.position"
                                    placeholder="Chọn vị trí"
                                    label-in-value
                                    size="large"
                                    style="width: 150px"
                                >
                                    <Option
                                        v-for="position in AttributeItemPosition"
                                        :key="position.id"
                                        :value="position.value"
                                    >
                                        {{ position.text }}</Option
                                    >
                                </Select>
                            </Row>
                        </Col>
                        <Col :span="2" style="padding-right: 20px">
                            <label style="font-weight: bold; text-align: center; display: block">Biến thể</label>
                            <Row align="center" style="margin-top: 20px">
                                <label v-if="!isEdit">{{ item.isVariant ? 'Có' : 'Không' }}</label>
                                <Checkbox v-else v-model:checked="item.isVariant"></Checkbox>
                            </Row>
                        </Col>
                        <Col v-if="isEdit" :span="2">
                            <Row>&nbsp;</Row>
                            <Row align="bottom" style="margin-top: 20px">
                                <Button type="primary" danger size="large" @click="onRemove(item)"
                                    ><DeleteOutlined /> Xóa</Button
                                >
                            </Row>
                        </Col>
                    </Row>
                </ul>
            </Col>
        </Row>
        <Row v-if="isEdit">
            <Col :span="12">
                <FormItem style="margin-top: 24px">
                    <Dropdown
                        :trigger="['click']"
                        :overlay-style="{ maxHeight: '500px', overflowY: 'auto', boxShadow: '0 2px 8px #00000026' }"
                        class="AttributeSetDetailChoose__Dropdown"
                    >
                        <Input
                            v-model:value="searchKey"
                            placeholder="Nhập tên thuộc tính cần tìm?"
                            size="large"
                            @change="onChange"
                        >
                            <template #suffix>
                                <SearchOutlined style="color: rgba(0, 0, 0, 0.25)" />
                            </template>
                        </Input>
                        <template v-if="attributeSuggestion || loading" #overlay>
                            <ul v-if="loading" class="AttributeSetDetailChoose__Dropdown__Menu">
                                <li class="item">
                                    <Spin />
                                </li>
                            </ul>
                            <ul v-else class="AttributeSetDetailChoose__Dropdown__Menu">
                                <!-- <Row align="bottom" style="padding: 5px 12px">
                                    <Button type="primary" @click="onNewProperties">
                                        <PlusOutlined />
                                        Thêm thuộc tính mới
                                    </Button>
                                </Row> -->
                                <li v-for="(item, idx) in attributeSuggestion" :key="idx" class="item">
                                    <Row align="bottom">
                                        <Checkbox
                                            :checked="isCheck(item)"
                                            :disabled="false"
                                            @change="() => onSelect(item)"
                                            >{{ item.label }}</Checkbox
                                        >
                                    </Row>
                                </li>
                            </ul>
                        </template>
                    </Dropdown>
                </FormItem>
            </Col>
        </Row>
    </div>
</template>
<script>
import { Input, Form, Dropdown, Col, Spin, Checkbox, Button, Row, Modal, Select, InputNumber } from 'ant-design-vue';
import { SearchOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import { useStore } from 'vuex';
import { computed, inject, ref, toRaw } from 'vue';
import { useProperties } from '@/composables/attributeset/create';
import { debounce } from 'lodash/fp';
import { AttributeItemPosition, AttributeItemType } from '@/constants/attributeItem';

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
        InputNumber,
    },
    setup() {
        const store = useStore();
        const modelRef = computed(() => store.state.attributeSet.detail.data);
        const isEdit = computed(() => store.state.attributeSet.detail.isEdit);

        const lstProperties = ref([]);
        const searchKey = ref('');

        const form = inject('form');
        const { validateInfos } = form;

        const { getAttribute, result: attributeSuggestion, loading } = useProperties();

        getAttribute(searchKey.value);

        const onCreateProps = () => {};

        const onSearch = debounce(300)(key => getAttribute(key));

        const onChange = e => onSearch(e.target.value);

        const onSelect = value => {
            debugger;
            const foundAttribute = attributeSuggestion.value.find(_ => _.id === value.id);
            if (foundAttribute) {
                const data = {
                    id: value.id,
                    position: undefined,
                    attribute: { ...foundAttribute, uiComponentType: foundAttribute.type },
                    group: '',
                    groupOrder: 1,
                    isVariant: false,
                    layoutPosition: undefined,
                    attrOrder: 1,
                };
                store.dispatch('attributeSet/addDetailAttributeSet', data);
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
            store.dispatch('attributeSet/removeDetailAttributeSet', item);
        };

        const onNewProperties = () => {
            var index = modelRef.value.attributes.findIndex(_ => _.id < 0);
            let properties = {};
            if (index < 0) {
                properties = {
                    id: -1,
                    attributeName: undefined,
                    nature: undefined,
                    isAdd: true,
                };
            } else {
                const ids = modelRef.value.attributes.filter(v => v.id < 0).map(m => m.id);
                properties = {
                    id: Math.min(ids) - 1,
                    attributeName: undefined,
                    nature: undefined,
                    isAdd: true,
                };
            }
            store.dispatch('attributeSet/addDetailAttributeSet', properties);
        };

        const isCheck = item => {
            var exits = modelRef.value.attributes.findIndex(_ => _.id === item.id);
            if (exits < 0) {
                return false;
            }
            return true;
        };

        const getAttributeItemType = item => {
            if (item && item.attribute && item.attribute.uiComponentType) {
                const data = AttributeItemType.find(f => f.value === item.attribute.uiComponentType);
                if (data) {
                    return data.text;
                }
            }
            return 'Không rõ';
        };
        const getPositionAttributeItem = item => {
            if (item && item.layoutPosition) {
                const data = AttributeItemPosition.find(f => f.value === item.layoutPosition);
                if (data) {
                    return data.text;
                }
            }
            return 'Không rõ';
        };
        return {
            modelRef,
            onCreateProps,
            lstProperties,
            searchKey,
            onChange,
            attributeSuggestion,
            loading,
            onSelect,
            onRemove,
            onNewProperties,
            isCheck,
            validateInfos,
            isEdit,
            AttributeItemPosition,
            getAttributeItemType,
            getPositionAttributeItem,
        };
    },
};
</script>
<style lang="scss">
.AttributeSetDetailChoose {
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

        &__Item {
            margin-bottom: 20px;
            padding: 15px;
            background: #d8e0e3;

            &:last-child {
                margin-bottom: 0;
            }
        }
    }
}
</style>
