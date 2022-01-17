import getters from './getters';
import actions from './actions';
import mutations from './mutations';

export default {
    namespaced: true,
    state: () => ({
        create: {
            data: {
                category: undefined,
                brand: undefined,
                name: '',
                attributes: [],
            },
        },
        detail: {
            data: {
                category: undefined,
                brand: undefined,
                name: '',
                attributes: [],
            },
            isEdit: false,
        },
        list: {
            data: {
                name: '',
                keyword: '',
                filters: {},
                filterCollected: {},
                pagination: {
                    defaultPageSize: 10,
                    current: 1,
                    offset: 0,
                    limit: 10,
                },
                progress: {
                    completed: 0,
                    total: 0,
                },
                selectedRow: [],
                isSelectedAll: false,
                isLoading: false,
                results: [],
                allResults: {},
            },
        },
        common: {
            data: {
                optionCategory: [],
                optionBrand: [],
                attributeSetIdError: [],
            },
        },
    }),
    getters,
    actions,
    mutations,
};
