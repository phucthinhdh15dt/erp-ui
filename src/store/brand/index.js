import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import { cloneDeep } from 'lodash/fp';

export const defaultState = {
    data: {
        id: undefined,
        name: '',
        code: '',
        description: '',
        status: undefined,
    },

    isOpen: false,
    isEdit: false,
};

export default {
    namespaced: true,
    state: () => cloneDeep(defaultState),
    getters,
    actions,
    mutations,
};
