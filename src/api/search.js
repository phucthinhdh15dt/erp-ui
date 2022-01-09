import { apiGenerator } from '@/helpers/api';
import { API_NAME } from '@/configs/api';

export default axios => ({
    searchAttribute(payload) {
        const api = apiGenerator(axios, API_NAME.SEARCH_ATTRIBUTE, { payload });
        return api.call();
    },
});
