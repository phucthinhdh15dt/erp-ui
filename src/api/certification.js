import { apiGenerator } from '@/helpers/api';
import { API_NAME } from '@/configs/api';

export default axios => ({
    create(payload) {
        const api = apiGenerator(axios, API_NAME.CREATE_CERTIFICATION, { payload });
        return api.call();
    },
    get(id) {
        const api = apiGenerator(axios, API_NAME.GET_CERTIFICATION, { params: { id } });
        return api.call();
    },
});
