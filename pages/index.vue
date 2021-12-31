<template>
    <div>
        <div>hello world</div>
        {{ result }}
    </div>
</template>
<script setup>
import { useTestComposable } from '@/composables/useTest';

const { result, getTest } = useTestComposable();
// const { result } = await useFetch('/api/test');
// const { result } = await useFetch('/api/test');
console.log('Component is setup!');
onMounted(() => {
    console.log('Component is mounted!');
    console.log('result', result);
});
</script>