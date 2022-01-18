import { apiGenerator } from '@/helpers/api';
import { API_NAME } from '@/configs/api';

export default axios => ({
    getAttributeSet(id) {
        const api = apiGenerator(axios, API_NAME.GET_ATTRIBUTE_SET, { params: { id } });
        return api.call();
    },
});
