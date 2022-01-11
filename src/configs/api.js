export const API_NAME = {
    // MODULE.PRODUCT_CATEGORY
    SEARCH_PRODUCT_CATEGORY: 'SEARCH_PRODUCT_CATEGORY',
    CREATE_CATEGORY: 'CREATE_CATEGORY',
    UPDATE_CATEGORY: 'UPDATE_CATEGORY',
};

const MODULE = {
    PRODUCT_CATEGORY: 'product-category',
};

export default {
    // MODULE.PRODUCT_CATEGORY
    [API_NAME.SEARCH_CATEGORY]: {
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
};
