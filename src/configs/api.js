export const API_NAME = {
    // MODULE.ORDER
    GET_ORDER: 'GET_ORDER',
};

const MODULE = {
    ORDER: 'order',
};

export default {
    // MODULE.ORDER_INDEX
    [API_NAME.SEARCH_ORDER]: {
        module: MODULE.ORDER_INDEX,
        endpoint: 'search',
        version: 'v1',
        method: 'GET',
    },
};
