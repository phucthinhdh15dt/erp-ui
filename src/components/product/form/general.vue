<template>
    <div>
        <div class="card-head-title">Thông tin chung</div>
        <Card body-style="padding: 20px 20px 0 20px">
            <FormItem
                v-if="isEdit"
                label="Trạng thái sản phẩm"
                class="form-label-w-18"
                v-bind="validateInfos['general.category']"
            >
                <StatusSelection :value="modelRef.general.status" @change="onChangeStatus" />
            </FormItem>
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
import { inject, watch, computed } from 'vue';
import { useStore } from 'vuex';
import { Card, Input, Form } from 'ant-design-vue';
import CategorySelection from '@/components/product/materials/categorySelection.vue';
import BrandSelection from '@/components/product/materials/brandSelection.vue';
import StatusSelection from '@/components/product/materials/statusSelection.vue';
import { useSearchAttributeSet } from '@/composables/product/attribute';

const { Item: FormItem } = Form;

const store = useStore();
const form = inject('form');
const modelRef = inject('modelRef');
const isEdit = inject('isEdit');
const { validateInfos } = form;

const general = computed(() => store.state.product.detail.general);

const { searchAttributeSet } = useSearchAttributeSet();

const onChangeCategory = value => {
    store.commit('product/setGeneralData', { data: value, field: 'category' });
};

const onChangeStatus = value => {
    store.commit('product/setGeneralData', { data: value, field: 'status' });
};

const onChangeBrand = value => {
    store.commit('product/setGeneralData', { data: value, field: 'brand' });
};

const onChangeInput = (field, data) => {
    store.commit('product/setGeneralData', { data, field });
};

watch(
    () => [general.value.category, general.value.brand],
    () => {
        if (general.value.category && general.value.brand) {
            searchAttributeSet(general.value.category, general.value.brand);
        }
    }
);
</script>
