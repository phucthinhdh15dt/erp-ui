<template>
    <div>
        <AttributeSet
            v-for="(attribute, index) in attributes"
            :key="index"
            :name="attribute.groupName"
            :code="attribute.groupCode"
            :is-variant="attribute.isVariant"
            :attributes="attribute.attributes"
        />
    </div>
</template>

<script setup>
import { toRefs } from 'vue';
import AttributeSet from './attributeSet.vue';

const props = defineProps({
    attributes: {
        type: Array,
        default: () => [],
    },
});
const { attributes } = toRefs(props);
</script>
