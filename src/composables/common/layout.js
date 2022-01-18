import { useStore } from 'vuex';

const useLayoutLoading = () => {
    const store = useStore();

    const layoutLoading = () => {
        store.commit('layout/setLoading', true);
    };

    const layoutDone = () => {
        store.commit('layout/setLoading', false);
    };

    return {
        layoutLoading,
        layoutDone,
    };
};

export { useLayoutLoading };
