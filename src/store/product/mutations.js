const setAttributes = (state, data) => {
    state.attributes = data;
};

const setProductDetail = (state, data) => {
    state.detail = data;
};

const setGeneralData = (state, { data, field }) => {
    state.detail.general[field] = data;
};

const setCertifications = (state, data) => {
    state.detail.certifications = data;
};

export default {
    setAttributes,
    setProductDetail,
    setGeneralData,
    setCertifications,
};
