const setMenuCollapsed = (state, data) => {
    state.menuCollapsed = data;
};

const setLoading = (state, data) => {
    state.loading = data;
};

export default {
    setMenuCollapsed,
    setLoading,
};
