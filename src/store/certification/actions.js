const setList = (context, data) => {
    const result = data.map(_ => ({ value: _.code, label: _.name }));
    context.commit('setList', result);
};

export default {
    setList,
};
