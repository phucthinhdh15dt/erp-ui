import { ref, onMounted } from 'vue';

export const useTestComposable = () => {
    const result = ref<object>({});

    const getTest = async () => {
        const { data } = await useFetch('/api/test');
        console.log("🚀 ~ file: useTest.ts ~ line 8 ~ getTest ~ data", data)
        
        result.value = data;
    };

    onMounted(getTest)

    return {
        getTest,
        result,
    };
};

export default () => useState<object>('test', () => ({ test: 1 }));
