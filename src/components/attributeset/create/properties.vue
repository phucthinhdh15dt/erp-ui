<template>
    <div>
        <div class="font-14 font-bold mb-12">Thông tin thuộc tính</div>
        <div v-if="modelRef.attributes && modelRef.attributes.length > 0" class="AttributeSetChoose">
            <Form
                v-for="(item, idx) in modelRef.attributes"
                ref="item"
                :key="idx"
                label-align="left"
                class="AttributeSetChoose__List__Item"
                :class="attributeIdsError && attributeIdsError.includes(item.id) ? 'error' : ''"
                :data-id="item.id"
            >
                <Row>
                    <Col :span="4" style="padding-right: 20px">
                        <Row>
                            <label style="font-weight: bold">Thuộc tính {{ idx + 1 }}</label>
                        </Row>
                        <Row style="margin-top: 20px">
                            <label>{{ item.label }}</label>
                        </Row>
                    </Col>
                    <Col :span="4" style="padding-right: 20px">
                        <Row>
                            <label style="font-weight: bold">Tính chất {{ idx + 1 }}</label>
                        </Row>
                        <Row style="margin-top: 20px">
                            <FormItem>
                                <label>{{ getAttributeItemType(item) }}</label>
                            </FormItem>
                        </Row>
                    </Col>
                    <Col :span="4" style="padding-right: 20px">
                        <Row>
                            <label style="font-weight: bold">Tên nhóm</label>
                        </Row>
                        <Row style="margin-top: 20px">
                            <Input v-model:value="item.groupName" placeholder="Nhập tên nhóm"> </Input>
                        </Row>
                    </Col>
                    <Col :span="3" style="padding-right: 20px">
                        <Row>
                            <label style="font-weight: bold">Thứ tự nhóm</label>
                        </Row>
                        <Row align="bottom" style="margin-top: 20px">
                            <InputNumber
                                v-model:value="item.groupOrder"
                                :min="1"
                                :max="10000"
                                style="width: 100%"
                                :formatter="value => `${value}`.replace('.', '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                                :parser="value => value.replace('.', '').replace(/\$\s?|(,*)/g, '')"
                                :step="1"
                            ></InputNumber>
                        </Row>
                    </Col>
                    <Col :span="2" style="padding-right: 20px">
                        <Row>
                            <label style="font-weight: bold">Số thứ tự</label>
                        </Row>
                        <Row align="bottom" style="margin-top: 20px">
                            <InputNumber
                                v-model:value="item.attributeOrder"
                                :min="1"
                                :max="10000"
                                style="width: 100%"
                                :formatter="value => `${value}`.replace('.', '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                                :parser="value => value.replace('.', '').replace(/\$\s?|(,*)/g, '')"
                                :step="1"
                            ></InputNumber>
                        </Row>
                    </Col>
                    <Col :span="3" style="padding-right: 20px">
                        <Row>
                            <label style="font-weight: bold">Vị trí</label>
                        </Row>
                        <Row align="bottom" style="margin-top: 20px">
                            <Select
                                v-model:value="item.attributePosition"
                                placeholder="Chọn vị trí"
                                style="width: 100%"
                                label-in-value
                                @change="onChangePosition"
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
                        <Row align="bottom">
                            <label style="font-weight: bold; text-align: center; display: block">Biến thể</label>
                        </Row>
                        <Row align="middle" style="margin-top: 23px; text-align: center; display: block">
                            <Checkbox v-model:checked="item.isVariant"></Checkbox>
                        </Row>
                    </Col>
                    <Col :span="2">
                        <Row>&nbsp;</Row>
                        <Row align="bottom" style="margin-top: 20px">
                            <Button type="primary" danger @click="onRemove(item)"><DeleteOutlined /> Xóa</Button>
                        </Row>
                    </Col>
                </Row>
            </Form>
        </div>

        <Row>
            <Col :span="12">
                <FormItem v-bind="validateInfos['attributes']" style="margin-top: 24px">
                    <Dropdown
                        :trigger="['click']"
                        :overlay-style="{ maxHeight: '500px', overflowY: 'auto', boxShadow: '0 2px 8px #00000026' }"
                        class="AttributeSetChoose__Dropdown"
                    >
                        <Input v-model:value="searchKey" placeholder="Nhập tên thuộc tính cần tìm?" @change="onChange">
                            <template #suffix>
                                <SearchOutlined style="color: rgba(0, 0, 0, 0.25)" />
                            </template>
                        </Input>
                        <template v-if="attributeSuggestion || loading" #overlay>
                            <ul v-if="loading" class="AttributeSetChoose__Dropdown__Menu">
                                <li class="item">
                                    <Spin />
                                </li>
                            </ul>
                            <ul v-else class="AttributeSetChoose__Dropdown__Menu">
                                <!-- <Row style="padding: 5px 12px">
                                    <Button type="primary" @click="onNewProperties">
                                        <PlusOutlined />
                                        Thêm thuộc tính mới
                                    </Button>
                                </Row> -->
                                <li v-for="(item, idx) in attributeSuggestion" :key="idx" class="item">
                                    <Row>
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
import { inject, ref, reactive, computed } from 'vue';
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
        const modelRef = inject('modelRef');
        const form = inject('form');
        const { validateInfos } = form;

        const lstProperties = ref([]);
        const searchKey = ref('');

        const attributeIdsError = computed(() => store.getters['attributeSet/getAttributeIdsError']);

        const { getAttribute, result: attributeSuggestion, loading } = useProperties();

        getAttribute(searchKey.value);

        const onCreateProps = () => {};

        const onSearch = debounce(300)(key => getAttribute(key));

        const onChange = e => onSearch(e.target.value);

        const onSelect = value => {
            const data = {
                code: value.code,
                id: value.id,
                label: value.label,
                type: value.type,
                attributeOrder: 1,
                groupOrder: 1,
                groupName: '',
                isVariant: false,
            };
            store.dispatch('attributeSet/addAttributeSet', data);
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
            store.dispatch('attributeSet/removeAttributeSet', item);
        };

        const onNewProperties = () => {
            var index = modelRef.value.attributes.findIndex(_ => _.id < 0);
            let properties = {};
            if (index < 0) {
                properties = {
                    id: -1,
                    attributeName: undefined,
                    nature: undefined,
                    attributeOrder: 0,
                    attributePosition: undefined,
                    isAdd: true,
                };
            } else {
                const ids = modelRef.value.attributes.filter(v => v.id < 0).map(m => m.id);
                properties = {
                    id: Math.min(ids) - 1,
                    attributeName: undefined,
                    nature: undefined,
                    attributeOrder: 0,
                    attributePosition: undefined,
                    isAdd: true,
                };
            }
            store.dispatch('attributeSet/addAttribute', properties);
        };

        const isCheck = item => {
            var exits = modelRef.value.attributes.findIndex(_ => _.id === item.id);
            if (exits < 0) {
                return false;
            }
            return true;
        };

        const onChangePosition = (value, option) => {};
        const getAttributeItemType = item => {
            if (item && item.type) {
                const data = AttributeItemType.find(f => f.value === item.type);
                if (data) {
                    return data.text;
                }
            }
            return 'Không rõ';
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
            onNewProperties,
            isCheck,
            AttributeItemPosition,
            onChangePosition,
            AttributeItemType,
            getAttributeItemType,
            attributeIdsError,
        };
    },
};
</script>
<style lang="scss">
.AttributeSetChoose {
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
            border: 1px dashed transparent;

            &:last-child {
                margin-bottom: 0;
            }

            &.error {
                border: 1px dashed $danger-color;
            }
        }
    }
}
</style>
