const setBrandCreate = (state, data) => {
    state.create.data = data;
};
const setBrandDetail = (state, data) => {
    state.detail.data = data;
};

const setIsOpen = (state, data) => {
    state.isOpen = data;
};
const setIsEdit = (state, data) => {
    state.isEdit = data;
};

export default {
    setBrandCreate,
    setBrandDetail,
    setIsOpen,
    setIsEdit,
};
