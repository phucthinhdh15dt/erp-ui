<template>
    <div>
        <Certification v-if="code === 'giay_chung_nhan'" />
        <Distributors v-else-if="code === 'nha_phan_phoi'" :attributes="attributes" />
        <Variant v-else-if="isVariant" :attributes="attributes" />
        <div v-else>
            <div class="card-head-title">{{ name }}</div>
            <Card body-style="padding: 20px 20px 0 20px">
                <Attribute v-for="(attribute, index) in attributes" :key="index" :configs="attribute" :parent="code" />
            </Card>
        </div>
    </div>
</template>

<script setup>
import { toRefs } from 'vue';
import { Card } from 'ant-design-vue';
import Attribute from './attribute.vue';
import Certification from './certification.vue';
import Distributors from './distributors.vue';
import Variant from './variant.vue';

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
</script>
