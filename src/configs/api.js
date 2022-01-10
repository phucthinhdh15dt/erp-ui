export const API_NAME = {
    GET_BRAND: 'GET_BRAND',
    POST_ATTRIBUTE_SET: 'POST_ATTRIBUTE_SET',
    GET_CATEGORY: 'GET_CATEGORY',
    GET_ATTRIBUTE_SET: 'GET_ATTRIBUTE_SET',
    GET_ATTRIBUTE: 'GET_ATTRIBUTE',
};

const MODULE = {
    AttributeSet: 'attribute-set',
    Attribute: 'attribute',
    Brand: 'brand',
    Product_Category: 'product-category',
};

export default {
    [API_NAME.POST_ATTRIBUTE_SET]: {
        module: MODULE.AttributeSet,
        endpoint: '',
        version: 'v1',
        method: 'POST',
    },
    [API_NAME.GET_CATEGORY]: {
        module: MODULE.Product_Category,
        endpoint: 'search',
        version: 'v1',
        method: 'POST',
    },
    [API_NAME.GET_BRAND]: {
        module: MODULE.Brand,
        endpoint: 'search',
        version: 'v1',
        method: 'POST',
    },
    [API_NAME.GET_ATTRIBUTE_SET]: {
        module: MODULE.AttributeSet,
        endpoint: '${ id }',
        version: 'v1',
        method: 'GET',
    },
    [API_NAME.GET_ATTRIBUTE]: {
        module: MODULE.Attribute,
        endpoint: 'search',
        version: 'v1',
        method: 'POST',
    },
};
