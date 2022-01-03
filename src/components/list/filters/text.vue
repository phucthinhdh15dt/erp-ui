<template>
    <div>
        <Input placeholder="" :value="localValue" @change="change" />
    </div>
</template>

<script>
import { defineComponent, inject, toRefs, watch, ref } from 'vue';
import { Input } from 'ant-design-vue';
export default defineComponent({
    components: {
        Input,
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
    },
    setup(props) {
        const { name, value } = toRefs(props);
        const localValue = ref('');
        const onChange = inject('onChange');
        const change = e => onChange({ name: name.value, value: e.target.value });

        watch(
            value,
            () => {
                localValue.value = value.value;
            },
            { deep: true }
        );

        return { change, localValue };
    },
});
</script>
