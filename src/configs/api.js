export const API_NAME = {
    // MODULE.ORDER
    GET_ORDER: 'GET_ORDER',
    SEARCH_ATTRIBUTE: 'SEARCH_ATTRIBUTE',
};

const MODULE = {
    ORDER: 'order',
    Attribute: 'attribute',
};

export default {
    // MODULE.ORDER_INDEX
    [API_NAME.SEARCH_ORDER]: {
        module: MODULE.ORDER_INDEX,
        endpoint: 'search',
        version: 'v1',
        method: 'GET',
    },
    [API_NAME.SEARCH_ATTRIBUTE]: {
        module: MODULE.Attribute,
        endpoint: 'search',
        version: 'v1',
        method: 'GET',
    },
};
