const getMenuCollapsed = (context, isMenuCollapsed) => {
    context.commit('setMenuCollapsed', isMenuCollapsed);
};

export default { getMenuCollapsed };
