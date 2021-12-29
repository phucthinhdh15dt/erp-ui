import { defineNuxtConfig } from "nuxt3";

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  ssr: process.env.NODE_ENV === "production",
  css: ["ant-design-vue/dist/antd.css"],
});
