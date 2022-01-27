<template>
    <div>
        <Certification v-if="code === 'giay_chung_nhan'">ahiih</Certification>
        <Distributors v-else-if="code === 'nha_phan_phoi'" :attributes="attributes" />
        <div v-else-if="isVariant">
            <div class="card-head-title">{{ name }}</div>
            <Card body-style="padding: 20px 20px 0 20px">
                <FormItem
                    v-for="(attribute, index) in attributes"
                    :key="index"
                    class="form-label-w-18"
                    :label="attribute.label"
                >
                    <Select
                        :value="attribute.value"
                        :options="attribute.options"
                        label-in-value
                        @change="value => onChange(attribute.code, index, value)"
                    />
                </FormItem>
            </Card>
        </div>
        <div v-else>
            <div class="card-head-title">{{ name }}</div>
            <Card body-style="padding: 20px 20px 0 20px">
                <Attribute v-for="(attribute, index) in attributes" :key="index" :configs="attribute" :parent="code" />
            </Card>
        </div>
    </div>
</template>

<script setup>
import { toRefs, inject } from 'vue';
import { useStore } from 'vuex';
import { Card, Form, Select } from 'ant-design-vue';
import Attribute from './attribute.vue';
import Certification from './certification.vue';
import Distributors from './distributors.vue';

const { Item: FormItem } = Form;
const modelRef = inject('modelRef');

const store = useStore();
const props = defineProps({
    name: {
        type: String,
        default: '',
    },
    code: {
        type: String,
        default: '',
    },
    isVariant: {
        type: Boolean,
        default: false,
    },
    attributes: {
        type: Array,
        default: () => [],
    },
});
const { name, code, isVariant, attributes } = toRefs(props);
const onChange = (field, index, value) => {
    store.commit('product/setVariantData', { field, index, value });
};
</script>
