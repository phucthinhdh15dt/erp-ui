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

    getNature() {
        // const api = apiGenerator(axios, API_NAME.SEARCH_ORDER_ES, { payload });
        // return api.call();
        return [
            {
                id: 1,
                natureName: 'Mô tả',
            },
            {
                id: 2,
                natureName: 'Thời gian',
            },
            {
                id: 3,
                natureName: 'Yes/No',
            },
            {
                id: 4,
                natureName: 'Drop down',
            },
            {
                id: 5,
                natureName: 'Multiple select',
            },
            {
                id: 6,
                natureName: 'Price',
            },
            {
                id: 7,
                natureName: 'Media image',
            },
            {
                id: 8,
                natureName: 'Visual Swatch',
            },
            {
                id: 9,
                natureName: 'Text Swatch',
            },
        ];
    },

    removeAttributeGroupId(id) {
        const api = apiGenerator(axios, API_NAME.DELETE_ATTRIBUTE_SET, { params: { id } });
        return api.call();
    },
});
