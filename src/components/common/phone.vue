<template>
    <a :href="`tel:${value}`">{{ valueDisplay }}</a>
</template>

<script>
import { computed } from 'vue';
import { formatPhoneNumber } from '@/utils/common';

export default {
    name: 'CommonPhone',
    props: {
        value: {
            type: String,
            default: '',
        },
    },
    setup(props) {
        const valueDisplay = computed(() => formatPhoneNumber(props.value));

        return { valueDisplay };
    },
};
</script>
