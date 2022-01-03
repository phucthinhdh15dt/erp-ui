<template>
    <div>
        <InputNumber v-model:value="inputValue1" :formatter="value => `${value} đ`" :min="0" @change="change" /> -
        <InputNumber
            v-model:value="inputValue2"
            :formatter="value => `${value} đ`"
            :min="inputValue1"
            @change="change"
        />
    </div>
</template>

<script>
import { defineComponent, ref, toRefs, inject } from 'vue';
import { InputNumber } from 'ant-design-vue';

export default defineComponent({
    components: {
        InputNumber,
    },
    props: {
        name: {
            type: String,
            default: () => '',
        },
    },
    setup(props) {
        const inputValue1 = ref(0);
        const inputValue2 = ref(0);
        const { name } = toRefs(props);
        const onChange = inject('onChange');

        const change = () => {
            inputValue1.value = Number.isInteger(inputValue1.value) ? inputValue1.value : 0;
            inputValue2.value = Number.isInteger(inputValue2.value) ? inputValue2.value : inputValue1.value;

            onChange({ name: name.value, value: [inputValue1.value, inputValue2.value] });
        };

        return {
            inputValue1,
            inputValue2,
            change,
        };
    },
});
</script>
