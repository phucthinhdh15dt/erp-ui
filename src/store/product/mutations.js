const setAttributes = (state, data) => {
    state.attributes = data;
};

const setProductDetail = (state, data) => {
    state.detail = data;
};

const setGeneralData = (state, { data, field }) => {
    state.detail.general[field] = data;
};

const setFilters = (state, data) => {
    state.filters = data;
};

const setFilterCollected = (state, data) => {
    state.filterCollected = data;
};

const setSearchResults = (state, data) => {
    state.results = data;
};

const setAllResults = (state, data) => {
    state.allResults = data;
};

const setSearchLoading = (state, data) => {
    state.isLoading = data;
};

const setSearchKeyword = (state, data) => {
    state.keyword = data;
};

const setSearchPagination = (state, data) => {
    state.pagination = data;
};

const setSearchPaginationCurrent = (state, data) => {
    state.pagination.current = data;
};

const setSearchSelectedRow = (state, data) => {
    state.selectedRow = data;
};

const setSearchSelectedAll = (state, data) => {
    state.isSelectedAll = data;
};

const setProgressTotal = (state, data) => {
    state.progress.total = data;
};

const setProgressCompleted = state => {
    if (state.progress.completed < state.progress.total) {
        state.progress.completed = state.progress.completed + 1;
    } else {
        state.progress = {
            completed: 0,
            total: 0,
        };
    }
};

const resetProgress = state => {
    state.progress = {
        completed: 0,
        total: 0,
    };
};

export default {
    setAttributes,
    setProductDetail,
    setGeneralData,
    //nope
    setFilters,
    setFilterCollected,
    setSearchResults,
    setAllResults,
    setSearchLoading,
    setSearchKeyword,
    setSearchPagination,
    setSearchPaginationCurrent,
    setSearchSelectedRow,
    setProgressTotal,
    setProgressCompleted,
    resetProgress,
    setSearchSelectedAll,
};
