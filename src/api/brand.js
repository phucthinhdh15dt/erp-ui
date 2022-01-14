import { apiGenerator } from '@/helpers/api';
import { API_NAME } from '@/configs/api';

export default axios => ({
    createBrand(payload) {
        const api = apiGenerator(axios, API_NAME.POST_BRAND, { payload });
        return api.call();
    },
});
