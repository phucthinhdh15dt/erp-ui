<template>
    <div>
        <Select
            ref="select"
            :value="valueProps"
            style="width: 200px"
            :options="configs.options || []"
            :mode="configs.mode"
            @change="change"
        >
        </Select>
    </div>
</template>

<script>
import { defineComponent, toRefs, inject } from 'vue';
import { Select } from 'ant-design-vue';

export default defineComponent({
    components: {
        Select,
    },
    props: {
        name: {
            type: String,
            default: () => '',
        },
        value: {
            type: String,
            default: () => '',
        },
        configs: {
            type: Object,
            default: () => {},
        },
    },
    setup(props) {
        const { name, value: valueProps } = toRefs(props);
        const onChange = inject('onChange');

        const change = input => {
            onChange({ name: name.value, value: input });
        };

        return { change, valueProps };
    },
});
</script>
