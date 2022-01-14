import { apiGenerator } from '@/helpers/api';
import { API_NAME } from '@/configs/api';

export default axios => ({
    createBrand(payload) {
        const api = apiGenerator(axios, API_NAME.POST_BRAND, { payload });
        return api.call();
    },
    getBrandId(id) {
        const api = apiGenerator(axios, API_NAME.GET_BRAND, { params: { id } });
        return api.call();
    },
    updateBrand(payload) {
        const api = apiGenerator(axios, API_NAME.PUT_BRAND, { payload });
        return api.call();
    },
});
