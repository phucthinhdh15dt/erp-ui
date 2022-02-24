import { ref, inject } from 'vue';
import { useStore } from 'vuex';
import { useLayoutLoading } from '@/composables/common/layout';

export const useSearchAttributeSet = () => {
    const { layoutLoading, layoutDone } = useLayoutLoading();
    const store = useStore();
    const api = inject('api');
    const loading = ref(false);
    const result = ref([]);
    const errorMessage = ref('');

    const searchAttributeSet = async (categoryId, brandId) => {
        layoutLoading();
        result.value = '';
        const payload = {
            query: {
                function_score: {
                    query: {
                        bool: {
                            must: [
                                {
                                    match: {
                                        'category.code': categoryId,
                                    },
                                },
                                {
                                    bool: {
                                        should: [
                                            {
                                                match: {
                                                    'brand.code': brandId,
                                                },
                                            },
                                            {
                                                bool: {
                                                    must_not: {
                                                        exists: {
                                                            field: 'brand',
                                                        },
                                                    },
                                                },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    functions: [
                        {
                            filter: {
                                match: {
                                    'brand.code': brandId,
                                },
                            },
                            weight: 100,
                        },
                    ],
                },
            },
            size: 1,
        };

        // if (brandId) {
        //     payload.query.bool.must.push({
        //         match: {
        //             'brand.code': brandId,
        //         },
        //     });
        // } else {
        //     payload.query.bool.should = {
        //         bool: {
        //             must_not: {
        //                 exists: {
        //                     field: 'category.code',
        //                 },
        //             },
        //         },
        //     };
        // }

        const responseSearch = await api.search.searchAttributeSet(payload);
        if (!responseSearch.data) {
            layoutDone();
            return;
        }

        const attributeSet = responseSearch.data.hits[0];
        if (!attributeSet) {
            layoutDone();
            return;
        }

        const responseGet = await api.attributeSet.getAttributeSetId(attributeSet.id);
        if (!responseGet.data) {
            layoutDone();
            return;
        }

        store.dispatch('product/setAttributes', responseGet.data);

        layoutDone();
    };

    return {
        searchAttributeSet,
        loading,
        result,
        errorMessage,
    };
};

export const useGetAttributeSet = () => {
    const api = inject('api');
    const loading = ref(false);
    const result = ref([]);
    const errorMessage = ref('');

    const getAttributeSet = async id => {
        loading.value = true;
        result.value = '';

        const response = await api.productAttribute.getAttributeSet(getAttributeSet);
        console.log('🚀 ~ file: attribute.js ~ line 55 ~ getAttributeSet ~ response', response);
        if (response.data) {
        }

        loading.value = false;
    };

    return {
        getAttributeSet,
        loading,
        result,
        errorMessage,
    };
};
