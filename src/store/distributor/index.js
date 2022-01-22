import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import { cloneDeep } from 'lodash/fp';

export const defaultState = {
    list: [],
};

export default {
    namespaced: true,
    state: () => cloneDeep(defaultState),
    getters,
    actions,
    mutations,
};
