<template>
    <div v-if="category">
        {{ category.label }}
    </div>
</template>

<script setup>
import { toRefs, computed } from 'vue';
import { useGetAllCategory } from '@/composables/product/category';

const props = defineProps({
    value: { type: String, default: null },
});

const { value } = toRefs(props);
const { result: categories } = useGetAllCategory();

const category = computed(() => categories.value.find(_ => _.value === value.value));
</script>
