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

export default {
    setAttributeCreate,
    setAttributeCreateCategory,
    setAttributeCreateBrand,
    setAttributeCreateName,
    setAttributeCreateListAttribute,
};
