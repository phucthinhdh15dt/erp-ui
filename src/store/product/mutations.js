const setAttributes = (state, data) => {
    state.attributes = data;
};

const setProductDetail = (state, data) => {
    state.detail = data;
};

const setGeneralData = (state, { data, field }) => {
    state.detail.general[field] = data;
};

const setAttributeData = (state, { data, field }) => {
    state.detail[field] = data;
};

const setCertificationData = (state, { field, index, value }) => {
    state.detail.certifications[index][field] = value;
};

const addCertification = state => {
    state.detail.certifications.push({
        certificateId: '',
        publishDate: null,
        images: [],
    });
};

const removeCertification = (state, { index }) => {
    state.detail.certifications.splice(index, 1);
};

const setDistributorsData = (state, { field, index, value }) => {
    state.detail.distributors[index][field] = value;
};

const addDistributor = state => {
    state.detail.distributors.push({
        manufacturer: null,
        distributor: [],
    });
};

const removeDistributor = (state, { index }) => {
    state.detail.distributors.splice(index, 1);
};

const setProductCertifications = (state, data) => {
    state.detail.certifications = data;
};

export default {
    setAttributes,
    setProductDetail,
    setGeneralData,
    setProductCertifications,
    setAttributeData,
    setCertificationData,
    addCertification,
    removeCertification,
    setDistributorsData,
    addDistributor,
    removeDistributor,
};
