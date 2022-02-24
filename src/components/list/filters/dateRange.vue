<template>
    <div>
        <RangePicker v-model:value="scopedValue" @change="change" />
    </div>
</template>

<script>
import dayjs from 'dayjs';
import { defineComponent, toRefs, inject, ref, watch } from 'vue';
import { DatePicker } from 'ant-design-vue';

const { RangePicker } = DatePicker;
export default defineComponent({
    components: {
        RangePicker,
    },
    props: {
        name: {
            type: String,
            default: () => '',
        },
        value: {
            type: Array,
            default: () => [],
        },
    },
    setup(props) {
        const { name, value } = toRefs(props);
        const onChange = inject('onChange');
        const scopedValue = ref([]);

        const change = (date, dateString) => {
            if (!date.length) {
                onChange({ name: name.value, value: [] });
            } else {
                onChange({ name: name.value, value: dateString });
            }
        };

        watch(
            value,
            () => {
                if (!value.value.length) {
                    scopedValue.value = [];
                } else {
                    scopedValue.value = [dayjs(value.value[0]), dayjs(value.value[1])];
                }
            },
            { deep: true }
        );

        return { change, scopedValue };
    },
});
</script>
