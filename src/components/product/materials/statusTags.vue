<template>
    <div v-if="activeStatus">
        <Tag :color="activeStatus.color">{{ activeStatus.label }}</Tag>
    </div>
</template>

<script setup>
import { computed, toRefs } from 'vue';
import { Tag } from 'ant-design-vue';

const props = defineProps({
    value: { type: String, default: null },
});
const { value } = toRefs(props);

const statusList = [
    {
        value: 'SALE',
        label: 'Đang bán',
        color: 'green',
    },
    {
        value: 'IN_PRODUCTION',
        label: 'Đang sản xuất',
        color: 'blue',
    },
    {
        value: 'OUT_OF_STOCK',
        label: 'Hết hàng',
        color: 'red',
    },
];

const activeStatus = computed(() => statusList.find(_ => _.value === value.value));
</script>
