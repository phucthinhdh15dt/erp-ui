const setBrandData = (state, data) => {
    state.data = data;
};
const setIsOpen = (state, data) => {
    state.isOpen = data;
};
const setIsEdit = (state, data) => {
    state.isEdit = data;
};

export default {
    setBrandData,
    setIsOpen,
    setIsEdit,
};
