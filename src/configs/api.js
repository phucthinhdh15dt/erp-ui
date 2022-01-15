export const API_NAME = {
    // MODULE.PRODUCT_CATEGORY
    SEARCH_PRODUCT_CATEGORY: 'SEARCH_PRODUCT_CATEGORY',
    CREATE_CATEGORY: 'CREATE_CATEGORY',
    UPDATE_CATEGORY: 'UPDATE_CATEGORY',

    // MODULE.ATTRIBUTE_SET
    POST_ATTRIBUTE_SET: 'POST_ATTRIBUTE_SET',
    GET_ATTRIBUTE_SET: 'GET_ATTRIBUTE_SET',
    GET_ATTRIBUTE: 'GET_ATTRIBUTE',
    DELETE_ATTRIBUTE_SET: 'DELETE_ATTRIBUTE_SET',
    SEARCH_ATTRIBUTE_SET: 'SEARCH_ATTRIBUTE_SET',
    PUT_ATTRIBUTE_SET: 'PUT_ATTRIBUTE_SET',

    // MODULE.BRAND
    SEARCH_BRAND: 'SEARCH_BRAND',
    POST_BRAND: 'POST_BRAND',
    GET_BRAND: 'GET_BRAND',
    PUT_BRAND: 'PUT_BRAND',
};

const MODULE = {
    PRODUCT_CATEGORY: 'product-category',
    ATTRIBUTE_SET: 'attribute-set',
    ATTRIBUTE: 'attribute',
    BRAND: 'brand',
};

export default {
    // MODULE.PRODUCT_CATEGORY
    [API_NAME.SEARCH_PRODUCT_CATEGORY]: {
        module: MODULE.PRODUCT_CATEGORY,
        endpoint: 'search',
        version: 'v1',
        method: 'POST',
    },
    [API_NAME.CREATE_CATEGORY]: {
        module: MODULE.PRODUCT_CATEGORY,
        endpoint: '',
        version: 'v1',
        method: 'POST',
    },
    [API_NAME.UPDATE_CATEGORY]: {
        module: MODULE.PRODUCT_CATEGORY,
        endpoint: '',
        version: 'v1',
        method: 'PUT',
    },

    // MODULE.ATTRIBUTE_SET
    [API_NAME.POST_ATTRIBUTE_SET]: {
        module: MODULE.ATTRIBUTE_SET,
        endpoint: '',
        version: 'v1',
        method: 'POST',
    },
    [API_NAME.GET_ATTRIBUTE_SET]: {
        module: MODULE.ATTRIBUTE_SET,
        endpoint: '${ id }',
        version: 'v1',
        method: 'GET',
    },
    [API_NAME.DELETE_ATTRIBUTE_SET]: {
        module: MODULE.ATTRIBUTE_SET,
        endpoint: '',
        version: 'v1',
        method: 'DELETE',
    },
    [API_NAME.SEARCH_ATTRIBUTE_SET]: {
        module: MODULE.ATTRIBUTE_SET,
        endpoint: 'search',
        version: 'v1',
        method: 'POST',
    },
    [API_NAME.PUT_ATTRIBUTE_SET]: {
        module: MODULE.ATTRIBUTE_SET,
        endpoint: '',
        version: 'v1',
        method: 'PUT',
    },

    // MODULE.ATTRIBUTE
    [API_NAME.GET_ATTRIBUTE]: {
        module: MODULE.ATTRIBUTE,
        endpoint: 'search',
        version: 'v1',
        method: 'POST',
    },

    // MODULE.Brand
    [API_NAME.SEARCH_BRAND]: {
        module: MODULE.BRAND,
        endpoint: 'search',
        version: 'v1',
        method: 'POST',
    },

    [API_NAME.POST_BRAND]: {
        module: MODULE.BRAND,
        endpoint: '',
        version: 'v1',
        method: 'POST',
    },
    [API_NAME.GET_BRAND]: {
        module: MODULE.BRAND,
        endpoint: '${ id }',
        version: 'v1',
        method: 'GET',
    },
    [API_NAME.PUT_BRAND]: {
        module: MODULE.BRAND,
        endpoint: '',
        version: 'v1',
        method: 'PUT',
    },
};
