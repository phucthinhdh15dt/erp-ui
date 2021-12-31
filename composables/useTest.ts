import { ref, toRaw, reactive, toRefs } from 'vue';

export const useTestComposable = () => {
    const result = ref<object>(null);
    const state = reactive<object>({
        error: null,
        loading: false,
    });

    const getTest = async () => {
        console.log('herre');
        const { data } = await useFetch('/api/test', { pick: ['title'] });
        console.log('🚀 ~ file: useTest.ts ~ line 8 ~ getTest ~ data', data);
        result.value = data;
    };

    getTest();

    return {
        getTest,
        result,
        ...toRefs(state),
    };
};

export default () => useState<object>('test', () => ({ test: 1 }));
