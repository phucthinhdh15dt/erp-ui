import { defineNuxtConfig } from 'nuxt3';

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
    ssr: process.env.NODE_ENV === 'production',
    css: ['ant-design-vue/dist/antd.css', '@/assets/stylesheets/global.scss'],
    publicRuntimeConfig: {
        API_BASE_URL: process.env.API_BASE_URL,
    },
    privateRuntimeConfig: {
        API_SECRET: process.env.API_SECRET,
    },
});
