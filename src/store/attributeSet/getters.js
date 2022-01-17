const getAttribute = state => {
    return state.create.data;
};

const getAttributeIdsError = state => {
    return state.common.data.attributeSetIdError;
};

export default {
    getAttribute,
    getAttributeIdsError,
};
