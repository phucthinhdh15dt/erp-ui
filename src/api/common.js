import { apiGenerator } from '@/helpers/api';
import { API_NAME } from '@/configs/api';

export default axios => ({
    getCategory(payload) {
        const api = apiGenerator(axios, API_NAME.GET_CATEGORY, { payload });
        return api.call();
    },
    getBrand(payload) {
        const api = apiGenerator(axios, API_NAME.SEARCH_BRAND, { payload });
        return api.call();
    },
});
