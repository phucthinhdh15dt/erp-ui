import { apiGenerator } from '@/helpers/api';
import { API_NAME } from '@/configs/api';

export default axios => ({
    searchOrder(payload) {
        const api = apiGenerator(axios, API_NAME.SEARCH_ORDER_ES, { payload });
        return api.call();
    },
});
