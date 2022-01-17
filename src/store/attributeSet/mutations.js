const setAttributeCreate = (state, data) => {
    state.create.data = data;
};
const setAttributeSetCreateCategory = (state, data) => {
    state.create.data.category = data;
};
const setAttributeSetCreateBrand = (state, data) => {
    state.create.data.brand = data;
};
const setAttributeCreateName = (state, data) => {
    state.create.data.name = data;
};
const setAttributeSetCreateListAttribute = (state, data) => {
    state.create.data.attributes = data;
};

const setAttributeSetDetail = (state, data) => {
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
const setDetailAttributeSetProperties = (state, data) => {
    state.detail.data.attributes = data;
};

// List
const setSearchFilters = (state, data) => {
    const { name, value } = data;
    state.list.data.filters[name] = value;
};

const setFilters = (state, data) => {
    state.list.data.filters = data;
};

const setFilterCollected = (state, data) => {
    state.list.data.filterCollected = data;
};

const setSearchResults = (state, data) => {
    state.list.data.results = data;
};

const setAllResults = (state, data) => {
    state.list.data.allResults = data;
};

const setSearchLoading = (state, data) => {
    state.list.data.isLoading = data;
};

const setSearchKeyword = (state, data) => {
    state.list.data.keyword = data;
};

const setSearchPagination = (state, data) => {
    state.list.data.pagination = data;
};

const setSearchPaginationCurrent = (state, data) => {
    state.list.data.pagination.current = data;
};

const setSearchSelectedRow = (state, data) => {
    state.list.data.selectedRow = data;
};

const setSearchSelectedAll = (state, data) => {
    state.list.data.isSelectedAll = data;
};

const setProgressTotal = (state, data) => {
    state.list.data.progress.total = data;
};

const setProgressCompleted = state => {
    if (state.list.data.progress.completed < state.list.data.progress.total) {
        state.list.data.progress.completed = state.list.data.progress.completed + 1;
    } else {
        state.list.data.progress = {
            completed: 0,
            total: 0,
        };
    }
};

const resetProgress = state => {
    state.list.data.progress = {
        completed: 0,
        total: 0,
    };
};

const setCommonCategory = (state, data) => {
    state.common.data.optionCategory = data;
};

const setCommonBrand = (state, data) => {
    state.common.data.optionBrand = data;
};

const setAttributeIdsError = (state, data) => {
    state.common.data.attributeSetIdError = data;
};

export default {
    setAttributeCreate,
    setAttributeSetCreateCategory,
    setAttributeSetCreateBrand,
    setAttributeCreateName,
    setAttributeSetCreateListAttribute,
    setAttributeSetDetail,
    setDetailIsEdit,
    setDetailAttributeCategory,
    setDetailAttributeBrand,
    setDetailAttributeSetProperties,
    setSearchFilters,
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
    setCommonCategory,
    setCommonBrand,
    setAttributeIdsError,
};
