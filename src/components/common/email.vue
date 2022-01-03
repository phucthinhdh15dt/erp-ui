<template>
    <a :href="`mailto:${value}`">{{ value }}</a>
</template>

<script>
export default {
    name: 'CommonEmail',
    props: {
        value: {
            type: String,
            default: '',
        },
    },
};
</script>
