<template>
    <Card>
        <Row class="AttributeSetDetailBody">
            <Row>
                <Col :span="12" class="AttributeSetDetailBody__Item">
                    <FormItem label="Ngành hàng" v-bind="validateInfos.category">
                        <label v-if="!isEdit && modelRef.category" style="font-weight: bold">{{
                            modelRef.category.name
                        }}</label>
                        <Select
                            v-else
                            v-model:value="state.categoryName"
                            allow-clear
                            placeholder="Chọn ngành hàng"
                            @change="onChangeCategory"
                        >
                            <Option v-for="item in resultCate" :key="item.code" :value="item.label">
                                {{ item.label }}</Option
                            >
                        </Select>
                    </FormItem>
                </Col>
                <Col :span="12" class="AttributeSetDetailBody__Item">
                    <FormItem label="Thương hiệu">
                        <label v-if="!isEdit && modelRef.brand" style="font-weight: bold">{{
                            modelRef.brand.name
                        }}</label>
                        <Select
                            v-else
                            v-model:value="state.brandName"
                            allow-clear
                            placeholder="Chọn thương hiệu"
                            @change="onChangeBrand"
                        >
                            <Option v-for="item in resultBrand" :key="item.code" :value="item.label">
                                {{ item.label }}</Option
                            >
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col :span="12" class="AttributeSetDetailBody__Item">
                    <FormItem label="Tên nhóm" v-bind="validateInfos.name">
                        <label v-if="!isEdit" style="font-weight: bold">{{ modelRef.name }}</label>
                        <Input
                            v-else
                            v-model:value="modelRef.name"
                            name="name"
                            :maxlength="80"
                            placeholder="Tên nhóm thuộc tính"
                        />
                    </FormItem>
                </Col>
            </Row>
        </Row>
        <Properties />
    </Card>
</template>
<script>
import { Card, Form, Select, Input, Col, Row } from 'ant-design-vue';
import { watch, computed, reactive, inject } from 'vue';
import Properties from '@/components/attributeset/detail/properties.vue';
import { useStore } from 'vuex';
import { useCommon } from '@/composables/common/common';

const { Item: FormItem } = Form;
const { Option } = Select;

export default {
    components: {
        Card,
        Select,
        FormItem,
        Input,
        Col,
        Option,
        Row,
        Properties,
    },
    setup() {
        const store = useStore();

        const state = reactive({
            categoryName: undefined,
            brandName: undefined,
        });
        const form = inject('form');
        const { validateInfos } = form;

        const modelRef = computed(() => store.state.attributeSet.detail.data);

        const isEdit = computed(() => store.state.attributeSet.detail.isEdit);

        const { getCategory, getBrand, resultBrand, result: resultCate } = useCommon();

        getCategory();

        watch(
            () => resultCate.value,
            () => {
                if (resultCate.value) {
                    getBrand();
                }
            }
        );

        watch(
            () => resultBrand.value,
            () => {
                if (resultBrand.value && modelRef.value) {
                    if (modelRef.value.category) {
                        const cate = resultCate.value.find(f => f.id === modelRef.value.category.id.toString());
                        if (cate) {
                            state.categoryName = cate.label;
                        }
                        const brand = resultBrand.value.find(f => f.id === modelRef.value.brand.id.toString());
                        if (brand) {
                            state.brandName = brand.label;
                        }
                    }
                }
            }
        );

        const onChangeCategory = (value, option) => {
            if (option !== undefined) {
                const object = resultCate.value.find(f => f.code === option.key);
                if (object) {
                    state.categoryName = object.label;
                    store.commit('attributeSet/setDetailAttributeCategory', object);
                    return;
                }
            }
            store.commit('attributeSet/setDetailAttributeCategory', undefined);
        };

        const onChangeBrand = (value, option) => {
            if (option !== undefined) {
                const object = resultBrand.value.find(f => f.code === option.key);
                if (object) {
                    store.commit('attributeSet/setDetailAttributeBrand', object);
                    return;
                }
            }
            store.commit('attributeSet/setDetailAttributeBrand', undefined);
        };

        return {
            isEdit,
            modelRef,
            resultCate,
            resultBrand,
            onChangeBrand,
            onChangeCategory,
            state,
            validateInfos,
        };
    },
};
</script>
<style scoped lang="scss">
.AttributeSetDetailBody {
    &__Item {
        padding-right: 24px;
    }
}
</style>
