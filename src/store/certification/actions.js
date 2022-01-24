import { cloneDeep } from 'lodash/fp';
import { defaultState } from './index';

const setList = (context, data) => {
    const result = data.map(_ => ({ value: _.code, label: _.name }));
    context.commit('setList', result);
};

const setCertification = (context, data) => {
    console.log('🚀 ~ file: actions.js ~ line 10 ~ setCertification ~ data', data);
};

export default {
    setList,
    setCertification,
};
