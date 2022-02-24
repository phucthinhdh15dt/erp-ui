<template>
    <div class="CategoryList">
        <List
            :columns="columns"
            :filter-configs="filters"
            :search-configs="searchConfigs"
            :sort-configs="sortConfigs"
            name="ProductCategory"
        >
            <template #ActionArea><ActionArea /></template>
            <template #ResultTable><ResultTable :columns="columns" :search-configs="searchConfigs" /></template>
        </List>
    </div>
</template>

<script setup>
import { provide, ref } from 'vue';
import ActionArea from './list/actionArea.vue';
import ResultTable from './list/resultTable.vue';
import List from '@/components/list/index.vue';
import { columns, filters, searchConfigs, sortConfigs } from './list/configs';

const processingItem = ref(null);
provide('processingItem', processingItem);
</script>
