<template>
    <div v-if="distributor">
        {{ distributor.label }}
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

const distributorOptions = computed(() => store.state.distributor.list);

const distributor = computed(() => distributorOptions.value.find(_ => _.value === value.value));
</script>
