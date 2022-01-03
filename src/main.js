import { createApp } from 'vue';
import VueAxios from 'vue-axios';
import axios from '@/plugins/axios';
import mbbFirebase from '@/plugins/firebase';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import api from '@/api';
import Layout from '@/layouts';
import printer from './plugins/printer';

mbbFirebase.initializeApp();
const app = createApp(App);

app.use(store);
app.use(router);
app.use(VueAxios, axios);
app.use(api);
app.use(printer);
app.component('Layout', Layout);
app.mount('#app');
