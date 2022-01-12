import { apiGenerator } from '@/helpers/api';
import { API_NAME } from '@/configs/api';

export default axios => ({
    createAttributeSet(payload) {
        const api = apiGenerator(axios, API_NAME.POST_ATTRIBUTE_SET, { payload });
        return api.call();
    },

    getAttributeSetId(id) {
        const api = apiGenerator(axios, API_NAME.GET_ATTRIBUTE_SET, { params: { id } });
        return api.call();
    },

    getAttribute(payload) {
        const api = apiGenerator(axios, API_NAME.GET_ATTRIBUTE, { payload });
        return api.call();
    },

    removeAttributeSetId(id) {
        const api = apiGenerator(axios, API_NAME.DELETE_ATTRIBUTE_SET, { params: { id } });
        return api.call();
    },

    getUpdateAttributeSet(payload) {
        const api = apiGenerator(axios, API_NAME.PUT_ATTRIBUTE_SET, { payload });
        return api.call();
    },
});
