const setList = (context, data) => {
    const result = data.map(_ => ({ value: _.code, label: _.name, status: _.status }));
    context.commit('setList', result);
};

export default {
    setList,
};
