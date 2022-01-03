<template>
    <span>{{ valueDisplay }}</span>
</template>

<script>
import { computed } from 'vue';
import { formatToCurrency } from '@/utils/number';

export default {
    name: 'CommonCurrency',
    props: {
        value: {
            type: Number,
            default: 0,
        },
    },
    setup(props) {
        const valueDisplay = computed(() => formatToCurrency(props.value));

        return { valueDisplay };
    },
};
</script>
