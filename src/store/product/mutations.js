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
    if (state.detail.distributors) {
        state.detail.distributors.push({
            manufacturer: null,
            distributor: [],
        });
    } else {
        state.detail.distributors = [
            {
                manufacturer: null,
                distributor: [],
            },
        ];
    }
};

const removeDistributor = (state, { index }) => {
    state.detail.distributors.splice(index, 1);
};

const addVariant = (state, data) => {
    state.detail.variants.push(data);
};

const removeVariant = (state, { index }) => {
    state.detail.variants.splice(index, 1);
};

const setVariantDataCreate = (state, { field, value }) => {
    state.detail.variants[field] = value;
};

const setVariantData = (state, { field, index, value }) => {
    state.detail.variants[index][field] = value;
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
    addVariant,
    removeVariant,
    setVariantDataCreate,
    setVariantData,
};
