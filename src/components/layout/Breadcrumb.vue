<template>
    <div class="ant-breadcrumb">
        <span v-for="item in data" :key="item.text">
            <a class="ant-breadcrumb-link" :href="item.to">{{ item.text }}</a>
            <span class="ant-breadcrumb-separator">•</span>
        </span>
    </div>
</template>
<script>
export default {
    name: 'Breadcrumb',
    props: {
        data: {
            type: Array,
            default: function () {
                return [];
            },
        },
    },
};
</script>
<style scoped lang="scss">
.ant-breadcrumb {
    text-align: left;

    a {
        font-size: 12px;
        line-height: 24px;
        color: #999;
    }

    > span:last-child a {
        color: #53459b;
    }
}

.ant-breadcrumb-separator {
    color: #999;
    margin: 0 8px;
}

.ant-breadcrumb > span:last-child .ant-breadcrumb-separator {
    display: none;
}
</style>
