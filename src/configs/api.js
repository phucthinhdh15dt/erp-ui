export const API_NAME = {
    // MODULE.PRODUCT_CATEGORY
    SEARCH_PRODUCT_CATEGORY: 'SEARCH_PRODUCT_CATEGORY',
    CREATE_CATEGORY: 'CREATE_CATEGORY',
    UPDATE_CATEGORY: 'UPDATE_CATEGORY',

    // MODULE.ATTRIBUTE_SET
    POST_ATTRIBUTE_SET: 'POST_ATTRIBUTE_SET',
    GET_ATTRIBUTE_SET: 'GET_ATTRIBUTE_SET',
    DELETE_ATTRIBUTE_SET: 'DELETE_ATTRIBUTE_SET',
    SEARCH_ATTRIBUTE_SET: 'SEARCH_ATTRIBUTE_SET',
    PUT_ATTRIBUTE_SET: 'PUT_ATTRIBUTE_SET',

    // MODULE.BRAND
    SEARCH_BRAND: 'SEARCH_BRAND',
    POST_BRAND: 'POST_BRAND',
    GET_BRAND: 'GET_BRAND',
    PUT_BRAND: 'PUT_BRAND',

    // MODULE.ATTRIBUTE
    SEARCH_ATTRIBUTE: 'SEARCH_ATTRIBUTE',
    POST_ATTRIBUTE: 'POST_ATTRIBUTE',
    PUT_ATTRIBUTE: 'PUT_ATTRIBUTE',
    GET_ATTRIBUTE: 'GET_ATTRIBUTE',

    //MODULE.PRODUCT
    CREATE_PRODUCT: 'CREATE_PRODUCT',
    UPDATE_PRODUCT: 'UPDATE_PRODUCT',
    SEARCH_PRODUCT: 'SEARCH_PRODUCT',
    GET_PRODUCT: 'GET_PRODUCT',

    //MODULE.MANUFACTURER
    SEARCH_MANUFACTURER: 'SEARCH_MANUFACTURER',
    //  GET_PRODUCT: 'GET_PRODUCT',

    //MODULE.DISTRIBUTOR
    SEARCH_DISTRIBUTOR: 'SEARCH_DISTRIBUTOR',
    //  GET_PRODUCT: 'GET_PRODUCT',

    // MODULE.CERTIFICATION
    SEARCH_CERTIFICATION: 'SEARCH_CERTIFICATION',
    CREATE_CERTIFICATION: 'CREATE_CERTIFICATION',
    GET_CERTIFICATION: 'GET_CERTIFICATION',
    UPDATE_CERTIFICATION: 'UPDATE_CERTIFICATION',
};

const MODULE = {
    PRODUCT_CATEGORY: 'product-category',
    ATTRIBUTE_SET: 'attribute-set',
    ATTRIBUTE: 'attribute',
    BRAND: 'brand',
    PRODUCT: 'product',
    MANUFACTURER: 'product-manufacturer',
    DISTRIBUTOR: 'distribution-channel',
    CERTIFICATION: 'product-disclosure',
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
    [API_NAME.SEARCH_ATTRIBUTE]: {
        module: MODULE.ATTRIBUTE,
        endpoint: 'search',
        version: 'v1',
        method: 'POST',
    },
    [API_NAME.POST_ATTRIBUTE]: {
        module: MODULE.ATTRIBUTE,
        endpoint: '',
        version: 'v1',
        method: 'POST',
    },

    // MODULE.BRAND
    [API_NAME.PUT_ATTRIBUTE]: {
        module: MODULE.ATTRIBUTE,
        endpoint: '',
        version: 'v1',
        method: 'PUT',
    },
    [API_NAME.GET_ATTRIBUTE]: {
        module: MODULE.ATTRIBUTE,
        endpoint: '${ id }',
        version: 'v1',
        method: 'GET',
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

    // MODULE.PRODUCT
    [API_NAME.CREATE_PRODUCT]: {
        module: MODULE.PRODUCT,
        endpoint: '',
        version: 'v1',
        method: 'POST',
    },
    [API_NAME.UPDATE_PRODUCT]: {
        module: MODULE.PRODUCT,
        endpoint: '',
        version: 'v1',
        method: 'PUT',
    },
    [API_NAME.SEARCH_PRODUCT]: {
        module: MODULE.PRODUCT,
        endpoint: 'search',
        version: 'v1',
        method: 'POST',
    },
    [API_NAME.GET_PRODUCT]: {
        module: MODULE.PRODUCT,
        endpoint: '',
        version: 'v1',
        method: 'GET',
    },

    //MODULE.MANUFACTURER
    [API_NAME.SEARCH_MANUFACTURER]: {
        module: MODULE.MANUFACTURER,
        endpoint: 'search',
        version: 'v1',
        method: 'POST',
    },

    //MODULE.DISTRIBUTOR
    [API_NAME.SEARCH_DISTRIBUTOR]: {
        module: MODULE.DISTRIBUTOR,
        endpoint: 'search',
        version: 'v1',
        method: 'POST',
    },
    //MODULE.CERTIFICATION
    [API_NAME.SEARCH_CERTIFICATION]: {
        module: MODULE.CERTIFICATION,
        endpoint: 'search',
        version: 'v1',
        method: 'POST',
    },
    [API_NAME.CREATE_CERTIFICATION]: {
        module: MODULE.CERTIFICATION,
        endpoint: '',
        version: 'v1',
        method: 'POST',
    },
    [API_NAME.UPDATE_CERTIFICATION]: {
        module: MODULE.CERTIFICATION,
        endpoint: '',
        version: 'v1',
        method: 'PUT',
    },
    [API_NAME.GET_CERTIFICATION]: {
        module: MODULE.CERTIFICATION,
        endpoint: '${id}',
        version: 'v1',
        method: 'GET',
    },
};
