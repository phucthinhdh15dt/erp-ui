import getters from './getters';
import actions from './actions';
import mutations from './mutations';

export default {
    namespaced: true,
    state: () => ({
        attributes: {
            left: [],
            right: [],
            all: [],
        },
        detail: {
            general: {
                brand: null,
                category: null,
                name: '',
                englishName: '',
                registedName: '',
                url: '',
            },
        },
        create: {
            data: {
                product: {
                    items: [],
                },
            },
        },
    }),
    getters,
    actions,
    mutations,
};
