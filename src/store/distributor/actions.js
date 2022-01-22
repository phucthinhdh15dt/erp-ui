import { cloneDeep } from 'lodash/fp';
import { defaultState } from './index';

const setList = (context, data) => {
    console.log('🚀 ~ file: actions.js ~ line 5 ~ setList ~ data', data);

    const result = data.map(_ => ({ value: _.code, label: _.name }));
    context.commit('setList', result);
};

export default {
    setList,
};
