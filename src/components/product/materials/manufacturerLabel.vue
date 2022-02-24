<template>
    <div v-if="manufacturer">
        {{ manufacturer.label }}
    </div>
</template>

<script setup>
import { toRefs, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const props = defineProps({
    value: { type: String, default: null },
});
const { value } = toRefs(props);

const manufacturerOptions = computed(() => store.state.manufacturer.list);

const manufacturer = computed(() => manufacturerOptions.value.find(_ => _.value === value.value));
</script>
