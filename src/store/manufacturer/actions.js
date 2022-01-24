const setList = (context, data) => {
    console.log('🚀 ~ file: actions.js ~ line 5 ~ setList ~ data', data);

    const result = data.map(_ => ({ value: _.code, label: _.name, status: _.status }));
    context.commit('setList', result);
};

export default {
    setList,
};
