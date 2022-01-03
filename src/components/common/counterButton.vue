<template>
    <ButtonGroup class="counterButton">
        <Button type="primary" @click="onMinus">
            <template #icon>
                <MinusOutlined />
            </template>
        </Button>
        <InputNumber :value="value" :max="max" :min="min" @change="onChange" />
        <Button type="primary" @click="onPlus">
            <template #icon>
                <PlusOutlined />
            </template>
        </Button>
    </ButtonGroup>
</template>

<script>
import { toRefs } from 'vue';
import { Button, InputNumber } from 'ant-design-vue';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons-vue';

const { Group: ButtonGroup } = Button;

export default {
    name: 'CommonPhone',
    components: {
        Button,
        ButtonGroup,
        MinusOutlined,
        PlusOutlined,
        InputNumber,
    },
    props: {
        value: {
            type: Number,
            default: 0,
        },
        max: {
            type: Number,
            default: Number.POSITIVE_INFINITY,
        },
        min: {
            type: Number,
            default: 0,
        },
    },
    setup(props, { emit }) {
        const { value: valueProps } = toRefs(props);
        const onChange = val => {
            emit('change', val);
        };

        const onMinus = () => {
            emit('change', valueProps.value - 1);
        };

        const onPlus = () => {
            emit('change', valueProps.value + 1);
        };

        return { onChange, onPlus, onMinus };
    },
};
</script>

<style lang="scss">
.counterButton {
    .ant-input-number-handler-wrap {
        display: none;
    }

    input {
        text-align: center;
    }

    .ant-input-number {
        width: 50px;
    }
}
</style>
