import getters from './getters';
import actions from './actions';
import mutations from './mutations';

export default {
    namespaced: true,
    state: () => ({
        attributes: {
            left: [],
            right: [],
        },
        detail: {
            general: {
                brand: '',
                category: '',
                name: '',
                englishName: '',
                registedName: '',
                url: '',
            },
        },
    }),
    getters,
    actions,
    mutations,
};
