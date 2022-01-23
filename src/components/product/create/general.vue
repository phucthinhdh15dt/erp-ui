<template>
    <div>
        <div class="card-head-title">Thông tin chung</div>
        <Card body-style="padding: 20px 20px 0 20px">
            <FormItem label="Ngành hàng" class="form-label-w-18" v-bind="validateInfos['general.category']">
                <CategorySelection :value="modelRef.general.category" @change="onChangeCategory" />
            </FormItem>
            <FormItem label="Thương hiệu" class="form-label-w-18" v-bind="validateInfos['general.brand']">
                <BrandSelection :value="modelRef.general.brand" @change="onChangeBrand" />
            </FormItem>
            <FormItem label="Tên sản phẩm" class="form-label-w-18" v-bind="validateInfos['general.name']">
                <Input :value="modelRef.general.name" @change="e => onChangeInput('name', e.target.value)" />
            </FormItem>
            <FormItem
                label="Tên sản phẩm đăng ký"
                class="form-label-w-18"
                v-bind="validateInfos['general.registedName']"
            >
                <Input
                    :value="modelRef.general.registedName"
                    @change="e => onChangeInput('registedName', e.target.value)"
                />
            </FormItem>
            <FormItem label="Tên tiếng anh" class="form-label-w-18" v-bind="validateInfos['general.englishName']">
                <Input
                    :value="modelRef.general.englishName"
                    @change="e => onChangeInput('englishName', e.target.value)"
                />
            </FormItem>
            <FormItem label="Url" class="form-label-w-18" v-bind="validateInfos['general.url']">
                <Input :value="modelRef.general.url" @change="e => onChangeInput('url', e.target.value)" />
            </FormItem>
        </Card>
    </div>
</template>

<script setup>
import { inject, watch } from 'vue';
import { useStore } from 'vuex';
import { Card, Input, Form, message } from 'ant-design-vue';
import CategorySelection from '@/components/product/materials/categorySelection.vue';
import BrandSelection from '@/components/product/materials/brandSelection.vue';
import { useSearchAttributeSet } from '@/composables/product/attribute';

const { Item: FormItem } = Form;

const store = useStore();
const form = inject('form');
const modelRef = inject('modelRef');
const { validateInfos } = form;

const { searchAttributeSet } = useSearchAttributeSet();

const onChangeCategory = value => {
    store.commit('product/setGeneralData', { data: value, field: 'category' });
    // modelRef.general.category = value;
};

const onChangeBrand = value => {
    console.log('value1', value);
    store.commit('product/setGeneralData', { data: value, field: 'brand' });

    // modelRef.general.brand = value;
};

const onChangeInput = (field, data) => {
    store.commit('product/setGeneralData', { data, field });
};

watch(
    () => [modelRef.general.category, modelRef.general.brand],
    () => {
        if (modelRef.general.category && modelRef.general.brand) {
            searchAttributeSet(modelRef.general.category, modelRef.general.brand);
        }
    }
);
</script>
