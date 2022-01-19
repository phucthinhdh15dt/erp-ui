<template>
    <div>
        <AttributeSet
            v-for="(attribute, index) in attributes"
            :key="index"
            :name="attribute.groupName"
            :code="attribute.groupCode"
            :is-variant="attribute.isVariant"
            :attributes="attribute.attributes"
        ></AttributeSet>
    </div>
</template>

<script setup>
import { computed, inject, toRefs } from 'vue';
import { useStore } from 'vuex';
import { Card, Input, Form } from 'ant-design-vue';
import AttributeSet from './attributeSet.vue';

const store = useStore();

const { Item: FormItem } = Form;

const props = defineProps({
    attributes: {
        type: Array,
        default: () => [],
    },
});
const { attributes } = toRefs(props);
</script>
