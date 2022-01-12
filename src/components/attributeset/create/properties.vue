<template>
    <div>
        <div class="font-14 font-bold">Thông tin thuộc tính</div>
        <Row>
            <Col
                v-if="modelRef.attributes && modelRef.attributes.length > 0"
                style="margin-bottom: 0; width: 100%; margin-top: 24px"
                class="AttributeSetChoose"
            >
                <ul class="AttributeSetChoose__List">
                    <Row v-for="(item, idx) in modelRef.attributes" :key="idx" class="AttributeSetChoose__List__Item">
                        <Col :span="5" style="padding-right: 20px">
                            <Row>
                                <label style="font-weight: bold">Thuộc tính {{ idx + 1 }}</label>
                            </Row>
                            <Row style="margin-top: 20px">
                                <label style="margin-left: 20px">{{ item.label }}</label>
                            </Row>
                        </Col>
                        <Col :span="3" style="padding-right: 20px">
                            <Row>
                                <label style="font-weight: bold">Tính chất {{ idx + 1 }}</label>
                            </Row>
                            <Row style="margin-top: 20px">
                                <label>{{ getAttributeItemType(item) }}</label>
                            </Row>
                        </Col>
                        <Col :span="4" style="padding-right: 20px">
                            <label style="font-weight: bold">Tên nhóm</label>
                            <Row align="bottom" style="margin-top: 20px">
                                <Input v-model:value="item.groupName" placeholder="Nhập tên nhóm" size="large"> </Input>
                            </Row>
                        </Col>

                        <Col :span="2" style="padding-right: 20px">
                            <label style="font-weight: bold">Thứ tự nhóm</label>
                            <Row align="bottom" style="margin-top: 20px">
                                <InputNumber
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
                        <Col :span="2" style="padding-right: 20px">
                            <label style="font-weight: bold">Số thứ tự</label>
                            <Row align="bottom" style="margin-top: 20px">
                                <InputNumber
                                    v-model:value="item.attributeOrder"
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
                        <Col :span="3" style="padding-right: 20px">
                            <label style="font-weight: bold">Vị trí</label>
                            <Row align="bottom" style="margin-top: 20px">
                                <Select
                                    v-model:value="item.attributePosition"
                                    placeholder="Chọn vị trí"
                                    size="large"
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
                        <Col :span="2">
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

        <Row>
            <Col :span="12">
                <FormItem v-bind="validateInfos['attributes']" style="margin-top: 24px">
                    <Dropdown
                        :trigger="['click']"
                        :overlay-style="{ maxHeight: '500px', overflowY: 'auto', boxShadow: '0 2px 8px #00000026' }"
                        class="AttributeSetChoose__Dropdown"
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
                            <ul v-if="loading" class="AttributeSetChoose__Dropdown__Menu">
                                <li class="item">
                                    <Spin />
                                </li>
                            </ul>
                            <ul v-else class="AttributeSetChoose__Dropdown__Menu">
                                <Row style="padding: 5px 12px">
                                    <Button type="primary" @click="onNewProperties">
                                        <PlusOutlined />
                                        Thêm thuộc tính mới
                                    </Button>
                                </Row>
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
import { inject, ref, toRaw } from 'vue';
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
        PlusOutlined,
        InputNumber,
    },
    setup() {
        const store = useStore();
        const modelRef = inject('modelRef');
        const form = inject('form');
        const { validateInfos } = form;

        const lstProperties = ref([]);
        const searchKey = ref('');

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
                attributePosition: AttributeItemPosition[0],
                attributeOrder: 1,
                groupOrder: 1,
                groupName: '',
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
            store.dispatch('attributeSet/removeAttribute', item);
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

            &:last-child {
                margin-bottom: 0;
            }
        }
    }
}
</style>
