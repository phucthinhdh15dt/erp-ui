export const API_NAME = {
    // MODULE.PRODUCT_CATEGORY
    SEARCH_PRODUCT_CATEGORY: 'SEARCH_PRODUCT_CATEGORY',
    CREATE_CATEGORY: 'CREATE_CATEGORY',
    UPDATE_CATEGORY: 'UPDATE_CATEGORY',
    // MODULE.BRAND
    SEARCH_BRAND: 'SEARCH_BRAND',
    // MODULE.ATTRIBUTE_SET
    SEARCH_ATTRIBUTE_SET: 'SEARCH_ATTRIBUTE_SET',
    GET_ATTRIBUTE_SET: 'GET_ATTRIBUTE_SET',
    //MODULE.PRODUCT
    CREATE_PRODUCT: 'CREATE_PRODUCT',
};

const MODULE = {
    PRODUCT_CATEGORY: 'product-category',
    BRAND: 'brand',
    ATTRIBUTE_SET: 'attribute-set',
    PRODUCT: 'product',
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
    // MODULE.BRAND
    [API_NAME.SEARCH_BRAND]: {
        module: MODULE.BRAND,
        endpoint: 'search',
        version: 'v1',
        method: 'POST',
    },
    // MODULE.ATTRIBUTE_SET
    [API_NAME.SEARCH_ATTRIBUTE_SET]: {
        module: MODULE.ATTRIBUTE_SET,
        endpoint: 'search',
        version: 'v1',
        method: 'POST',
    },
    [API_NAME.GET_ATTRIBUTE_SET]: {
        module: MODULE.ATTRIBUTE_SET,
        endpoint: '${ id }',
        version: 'v1',
        method: 'GET',
    },
    // MODULE.BRAND
    [API_NAME.CREATE_PRODUCT]: {
        module: MODULE.PRODUCT,
        endpoint: '',
        version: 'v1',
        method: 'POST',
    },
};
