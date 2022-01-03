<template>
    <span>{{ datetimeFormatted }}</span>
</template>

<script>
import { computed } from 'vue';
import { getFormatDate } from '@/utils/datetime';
import moment from 'moment';

export default {
    name: 'CommonDatetime',
    props: {
        value: {
            type: String,
            default: '',
        },
        noTime: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        const datetimeFormatted = computed(() =>
            moment(props.value).utcOffset(14).format(getFormatDate(props.value, false, props.noTime))
        );

        return { datetimeFormatted };
    },
};
</script>
