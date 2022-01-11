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
                groupOrder: 0,
                layoutPosition: null,
            },
        },
        detail: {
            data: {
                category: undefined,
                brand: undefined,
                name: '',
                attributes: [],
                groupOrder: 0,
                layoutPosition: null,
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
                    defaultPageSize: 30,
                    current: 1,
                    offset: 0,
                    limit: 30,
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
    }),
    getters,
    actions,
    mutations,
};
