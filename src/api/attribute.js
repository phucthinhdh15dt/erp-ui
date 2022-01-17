import { apiGenerator } from '@/helpers/api';
import { API_NAME } from '@/configs/api';

export default axios => ({
    createAttribute(payload) {
        const api = apiGenerator(axios, API_NAME.POST_ATTRIBUTE, { payload });
        return api.call();
    },
    updateAttribute(payload) {
        const api = apiGenerator(axios, API_NAME.PUT_ATTRIBUTE, { payload });
        return api.call();
    },
});
