<template>
    <Tag :color="status.color">{{ status.label }}</Tag>
</template>

<script>
import { computed, defineComponent } from 'vue';
import { Tag } from 'ant-design-vue';
import { getOr } from 'lodash/fp';

export default defineComponent({
    name: 'CommonStatus',
    components: {
        Tag,
    },
    props: {
        code: {
            type: String,
            default: '',
        },
        listStatus: {
            type: Array,
            default: undefined,
        },
    },
    setup(props) {
        const status = computed(() => getOr({}, props.code, props.listStatus));
        return { status };
    },
});
</script>
