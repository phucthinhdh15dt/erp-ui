import { apiGenerator } from '@/helpers/api';
import { API_NAME } from '@/configs/api';

export default axios => ({
    searchAttributeSet(payload) {
        const api = apiGenerator(axios, API_NAME.SEARCH_ATTRIBUTE_SET, { payload });
        return api.call();
    },
});
