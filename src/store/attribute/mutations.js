const setAttributeCreate = (state, data) => {
    state.create.data = data;
};
const setAttributeCreateCategory = (state, data) => {
    state.create.data.category = data;
};
const setAttributeCreateBrand = (state, data) => {
    state.create.data.brand = data;
};
const setAttributeCreateName = (state, data) => {
    state.create.data.name = data;
};
const setAttributeCreateListAttribute = (state, data) => {
    state.create.data.attributes = data;
};

const setAttributeDetail = (state, data) => {
    state.detail.data = data;
};

const setDetailIsEdit = (state, data) => {
    state.detail.isEdit = data;
};
const setDetailAttributeCategory = (state, data) => {
    state.detail.data.category = data;
};
const setDetailAttributeBrand = (state, data) => {
    state.detail.data.brand = data;
};

export default {
    setAttributeCreate,
    setAttributeCreateCategory,
    setAttributeCreateBrand,
    setAttributeCreateName,
    setAttributeCreateListAttribute,
    setAttributeDetail,
    setDetailIsEdit,
    setDetailAttributeCategory,
    setDetailAttributeBrand,
};
