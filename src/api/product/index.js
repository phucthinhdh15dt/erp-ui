import { apiGenerator } from '@/helpers/api';
import { API_NAME } from '@/configs/api';

export default axios => ({
    create(payload) {
        const api = apiGenerator(axios, API_NAME.CREATE_PRODUCT, { payload });
        return api.call();
    },
});
