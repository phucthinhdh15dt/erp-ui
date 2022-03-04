import { apiGenerator } from '@/helpers/api';
import { API_NAME } from '@/configs/api';

export default axios => ({
    create(payload) {
        const api = apiGenerator(axios, API_NAME.CREATE_PRODUCT, { payload });
        return api.call();
    },
    update(payload) {
        const api = apiGenerator(axios, API_NAME.UPDATE_PRODUCT, { payload });
        return api.call();
    },
    get(id) {
        const api = apiGenerator(axios, API_NAME.GET_PRODUCT, { query: { key: id } });
        return api.call();
    },

    //common get list create combo
    getProduct(query) {
        const api = apiGenerator(axios, API_NAME.GET_PRODUCT, { query });
        return api.call();
    },
});
