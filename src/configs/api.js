export const API_NAME = {
    // MODULE.ORDER
    SEARCH_ATTRIBUTE: 'SEARCH_ATTRIBUTE',
    GET_ATTRIBUTE: 'GET_ATTRIBUTE',
};

const MODULE = {
    Attribute: 'attribute',
};

export default {
    [API_NAME.SEARCH_ATTRIBUTE]: {
        module: MODULE.Attribute,
        endpoint: 'search',
        version: 'v1',
        method: 'GET',
    },
    [API_NAME.GET_ATTRIBUTE]: {
        module: MODULE.Attribute,
        endpoint: '{id}',
        version: 'v1',
        method: 'GET',
    },
};
