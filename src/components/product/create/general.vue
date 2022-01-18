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
            <FormItem label="Tên sản phẩm" class="form-label-w-18" v-bind="validateInfos['general.productName']">
                <Input v-model:value="modelRef.general.productName" />
            </FormItem>
            <FormItem
                label="Tên sản phẩm đăng ký"
                class="form-label-w-18"
                v-bind="validateInfos['general.registerName']"
            >
                <Input v-model:value="modelRef.general.registerName" />
            </FormItem>
            <FormItem label="Tên tiếng anh" class="form-label-w-18" v-bind="validateInfos['general.englishName']">
                <Input v-model:value="modelRef.general.englishName" />
            </FormItem>
            <FormItem label="Url" class="form-label-w-18" v-bind="validateInfos['general.url']">
                <Input v-model:value="modelRef.general.url" />
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

const onBlurName = e => {
    store.commit('promotion/setName', e.target.value.trim());
};

const onChangeDescription = e => {
    store.commit('promotion/setDescription', e.target.value);
};

const onChangeCategory = value => {
    console.log('value1', value);
    modelRef.general.category = value;
};

const onChangeBrand = value => {
    console.log('value1', value);
    modelRef.general.brand = value;
};

watch(
    () => [modelRef.general.category, modelRef.general.brand],
    () => {
        if (modelRef.general.category && modelRef.general.brand) {
            message.info('di lay attribute set di ban');
            searchAttributeSet(modelRef.general.category, modelRef.general.brand);
        }
    }
);
</script>
