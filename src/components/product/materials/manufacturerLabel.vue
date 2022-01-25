<template>
    <div v-if="manufacturer">
        {{ manufacturer.label }}
    </div>
</template>

<script setup>
import { toRefs, computed } from 'vue';

const props = defineProps({
    value: { type: String, default: null },
});
const { value } = toRefs(props);

const manufacturerOptions = computed(() => store.state.manufacturer.list);

const manufacturer = computed(() => manufacturerOptions.value.find(_ => _.value === value.value));
</script>
