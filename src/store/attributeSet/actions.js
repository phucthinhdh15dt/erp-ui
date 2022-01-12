import { cloneDeep } from 'lodash';

const addAttributeSet = (context, data) => {
    const { state } = context;
    const attributes = state.create.data.attributes;
    const foundAttribute = attributes.findIndex(_ => _.id === data.id);
    if (foundAttribute < 0) {
        context.commit('setAttributeSetCreateListAttribute', [...attributes, data]);
    } else {
        attributes.splice(foundAttribute, 1);
        context.commit('setAttributeSetCreateListAttribute', cloneDeep(attributes));
    }
};

const updateAttributeSet = (context, data) => {
    const { state } = context;
    const attributes = state.create.data.attributes;
    const foundAttribute = attributes.findIndex(_ => _.id === data.id);
    if (foundAttribute >= 0) {
        attributes[foundAttribute] = data;
        context.commit('setAttributeSetCreateListAttribute', cloneDeep(attributes));
    }
};

const removeAttributeSet = (context, data) => {
    const { state } = context;
    const attributes = state.create.data.attributes;

    const index = attributes.findIndex(_ => _.id === data.id);
    if (index >= 0) {
        attributes.splice(index, 1);
        context.commit('setAttributeSetCreateListAttribute', cloneDeep(attributes));
    }
};

const setAttributeDetail = (context, data) => {
    context.commit('setAttributeDetail', data);
};

const removeDetailAttributeSet = (context, data) => {
    const { state } = context;
    const attributes = state.detail.data.attributes;

    const index = attributes.findIndex(_ => _.id === data.id);
    if (index >= 0) {
        attributes.splice(index, 1);
        context.commit('setDetailAttributeSetProperties', cloneDeep(attributes));
    }
};

const addDetailAttribute = (context, data) => {
    const { state } = context;
    const attributes = state.detail.data.attributes;
    const foundAttribute = attributes.findIndex(_ => _.id === data.id);
    if (foundAttribute < 0) {
        context.commit('setDetailAttributeSetProperties', [...attributes, data]);
    } else {
        attributes.splice(foundAttribute, 1);
        context.commit('setDetailAttributeSetProperties', cloneDeep(attributes));
    }
};

export default {
    addAttributeSet,
    removeAttributeSet,
    setAttributeDetail,
    removeDetailAttributeSet,
    addDetailAttribute,
    updateAttributeSet,
};
