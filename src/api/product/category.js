import { apiGenerator } from '@/helpers/api';
import { API_NAME } from '@/configs/api';

export default axios => ({
    createCategory(payload) {
        const api = apiGenerator(axios, API_NAME.CREATE_CATEGORY, { payload });
        return api.call();
    },
    updateCategory(payload) {
        const api = apiGenerator(axios, API_NAME.UPDATE_CATEGORY, { payload });
        return api.call();
    },
});
