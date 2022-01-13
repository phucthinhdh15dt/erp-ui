<template>
    <div>
        <div class="card-head-title">Thông tin chung</div>
        <Card body-style="padding: 20px 20px 0 20px">
            <FormItem label="Ngành hàng" class="form-label-w-18" v-bind="validateInfos.category">
                <CategorySelection :value="modelRef.category" @change="onChangeCategory" />
            </FormItem>
            <FormItem label="Thương hiệu" class="form-label-w-18">
                <Input @blur="onBlurName" />
            </FormItem>
            <FormItem label="Tên sản phẩm" class="form-label-w-18">
                <Input @change="onChangeDescription" />
            </FormItem>
            <FormItem label="Tên sản phẩm đăng ký" class="form-label-w-18">
                <Input @change="onChangeDescription" />
            </FormItem>
            <FormItem label="Tên tiếng anh" class="form-label-w-18">
                <Input @change="onChangeDescription" />
            </FormItem>
            <FormItem label="Url" class="form-label-w-18">
                <Input @change="onChangeDescription" />
            </FormItem>
        </Card>
    </div>
</template>

<script setup>
import { inject } from 'vue';
import { useStore } from 'vuex';
import { Card, Input, Form, Select } from 'ant-design-vue';
import CategorySelection from './sub/categorySelection.vue';

const { Item: FormItem } = Form;

const store = useStore();
const form = inject('form');
const modelRef = inject('modelRef');
const { validateInfos } = form;

const onBlurName = e => {
    store.commit('promotion/setName', e.target.value.trim());
};

const onChangeDescription = e => {
    store.commit('promotion/setDescription', e.target.value);
};

const onChangeCategory = value => {
    console.log('value1', value);
    modelRef.category = value;
};
</script>
