import { apiGenerator } from '@/helpers/api';
import { API_NAME } from '@/configs/api';

export default axios => ({
    searchProductCategory(payload) {
        const api = apiGenerator(axios, API_NAME.PRODUCT_CATEGORY, { payload });
        return api.call();
    },
});
