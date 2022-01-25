<template>
    <div v-if="brand">
        {{ brand.label }}
    </div>
</template>

<script setup>
import { toRefs, computed } from 'vue';
import { useGetAllBrand } from '@/composables/brand';

const props = defineProps({
    value: { type: String, default: null },
});
const { value } = toRefs(props);

const { result: brands } = useGetAllBrand();

const brand = computed(() => brands.value.find(_ => _.value === value.value));
</script>
