<template>
    <div>
        <div class="font-14 font-bold">Thông tin thuộc tính</div>
        <Row>
            <Col
                v-if="modelRef.attributes && modelRef.attributes.length > 0"
                :span="15"
                style="margin-bottom: 0; width: 100%; margin-top: 24px"
                class="AttributeChoose"
            >
                <ul class="AttributeChoose__List">
                    <Row v-for="(item, idx) in modelRef.attributes" :key="idx" class="AttributeChoose__List__Item">
                        <Col :span="8" style="padding-right: 20px">
                            <Row>
                                <label style="font-weight: bold">Thuộc tính {{ idx + 1 }}</label>
                            </Row>
                            <Row style="margin-top: 20px">
                                <label v-if="!item.isAdd" style="margin-left: 20px">{{ item.attributeName }}</label>
                                <Input
                                    v-else
                                    v-model:value="item.attributeName"
                                    placeholder="Nhập tên thuộc tính"
                                    size="large"
                                >
                                </Input>
                            </Row>
                        </Col>
                        <Col :span="6">
                            <Row>
                                <label style="font-weight: bold">Tính chất {{ idx + 1 }}</label>
                            </Row>
                            <Row style="margin-top: 20px">
                                <label v-if="!item.isAdd && item.nature">{{ item.nature.natureName }}</label>

                                <Select
                                    v-else
                                    v-model:value="item.nature"
                                    label-in-value
                                    placeholder="Chọn tính chất"
                                    size="large"
                                    style="width: 200px"
                                >
                                    <Option
                                        v-for="nature in natureSuggestion"
                                        :key="nature.id"
                                        :value="nature.natureName"
                                    >
                                        {{ nature.natureName }}</Option
                                    >
                                </Select>
                            </Row>
                        </Col>
                        <Col :span="3">
                            <label style="font-weight: bold">Số thứ tự</label>
                            <Row align="bottom" style="margin-top: 20px">
                                <label v-if="!item.isAdd">{{ item.attributeOrder || 0 }}</label>
                                <InputNumber
                                    v-else
                                    v-model:value="item.attributeOrder"
                                    size="large"
                                    :min="1"
                                    :max="10000"
                                ></InputNumber>
                            </Row>
                        </Col>
                        <Col :span="4">
                            <label style="font-weight: bold">Vị trí</label>
                            <Row align="bottom" style="margin-top: 20px">
                                <label v-if="!item.isAdd">{{
                                    item.attributePosition ? AttributePosition[item.attributePosition].text : 'Không rõ'
                                }}</label>
                                <Select
                                    v-else
                                    v-model:value="item.attributePosition"
                                    placeholder="Chọn vị trí"
                                    label-in-value
                                    size="large"
                                    style="width: 150px"
                                >
                                    <Option
                                        v-for="position in AttributePosition"
                                        :key="position.id"
                                        :value="position.text"
                                    >
                                        {{ position.text }}</Option
                                    >
                                </Select>
                            </Row>
                        </Col>
                        <Col v-if="isEdit" :span="3">
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
                        class="AttributeChoose__Dropdown"
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
                            <ul v-if="loading" class="AttributeChoose__Dropdown__Menu">
                                <li class="item">
                                    <Spin />
                                </li>
                            </ul>
                            <ul v-else class="AttributeChoose__Dropdown__Menu">
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
                                            >{{ item.attributeName }}</Checkbox
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
import { Input, Form, Dropdown, Col, Spin, Checkbox, Button, Row, Modal, Select } from 'ant-design-vue';
import { SearchOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import { useStore } from 'vuex';
import { computed, inject, ref, toRaw } from 'vue';
import { useProperties } from '@/composables/attribute/create';
import { debounce } from 'lodash/fp';
import { AttributePosition } from '@/constants/attribibute';

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
        const modelRef = computed(() => store.state.attribute.detail.data);
        const isEdit = computed(() => store.state.attribute.detail.isEdit);

        const lstProperties = ref([]);
        const searchKey = ref('');

        const form = inject('form');
        const { validateInfos } = form;

        const {
            getAttribute,
            result: attributeSuggestion,
            resultNature: natureSuggestion,
            loading,
            getNature,
        } = useProperties();

        getAttribute(searchKey.value);

        getNature();
        const onCreateProps = () => {};

        const onSearch = debounce(300)(key => getAttribute(key));

        const onChange = e => onSearch(e.target.value);

        const onSelect = value => {
            debugger;
            const foundAttribute = attributeSuggestion.value.find(_ => _.id === value.id);
            if (foundAttribute) {
                store.dispatch('attribute/addDetailAttribute', toRaw(foundAttribute));
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
            store.dispatch('attribute/removeDetailAttribute', item);
        };

        const onChangeNature = (value, e) => {
            debugger;
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
            store.dispatch('attribute/addDetailAttribute', properties);
        };

        const isCheck = item => {
            var exits = modelRef.value.attributes.findIndex(_ => _.id === item.id);
            if (exits < 0) {
                return false;
            }
            return true;
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
            natureSuggestion,
            onChangeNature,
            onNewProperties,
            isCheck,
            validateInfos,
            isEdit,
            AttributePosition,
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
