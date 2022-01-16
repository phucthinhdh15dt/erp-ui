import { apiGenerator } from '@/helpers/api';
import { API_NAME } from '@/configs/api';

export default axios => ({
    searchAttributeSet(payload) {
        const api = apiGenerator(axios, API_NAME.SEARCH_ATTRIBUTE_SET, { payload });
        return api.call();
    },
    searchProductCategory(payload) {
        const api = apiGenerator(axios, API_NAME.SEARCH_PRODUCT_CATEGORY, { payload });
        return api.call();
    },
    searchBrand(payload) {
        const api = apiGenerator(axios, API_NAME.SEARCH_BRAND, { payload });
        return api.call();
    },
    searchAttribute(payload) {
        const api = apiGenerator(axios, API_NAME.SEARCH_ATTRIBUTE, { payload });
        return api.call();
    },
});
