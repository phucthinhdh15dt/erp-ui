import { ref, inject } from 'vue';
import { useStore } from 'vuex';
import { cloneDeep, isEmpty } from 'lodash/fp';

const useSearch = () => {
    const api = inject('api');
    const store = useStore();
    const searchResult = ref([]);

    const collectSearchPayload = searchQuery => {
        const { offset, limit, search, filters, searchConfigs, sortConfigs, filterDefault } = searchQuery;
        const q = filters.reduce(
            (acc, cur) => {
                if (cur.match) {
                    acc.must.push(cur);
                } else if (cur.range) {
                    acc.filter = cur;
                }

                return acc;
            },
            { must: [], filter: {} }
        );

        if (search) {
            q.must.push({
                multi_match: {
                    fields: searchConfigs.fields,
                    query: search,
                },
            });
        }

        let bool = {};
        if (!!q.must.length) {
            bool.must = q.must;
        }

        if (filterDefault.must_not) {
            bool.must_not = filterDefault.must_not;
        }

        if (!isEmpty(q.filter)) {
            bool.filter = q.filter;
        }

        const payload = {
            sort: sortConfigs,
            // from: offset,
            from: 0,
            // size: limit,
            size: 5,
        };

        if (sortConfigs) {
            payload.sort = sortConfigs;
        }

        if (!isEmpty(bool)) {
            payload.query = {
                bool,
            };
        }

        return payload;
    };

    const search = async (name, searchQuery) => {
        store.commit('attributeSet/setSearchLoading', true);
        const { offset, limit } = searchQuery;

        const payload = collectSearchPayload(searchQuery);
        const response = await api.search[`search${name}`](payload);
        const data = cloneDeep(response.data);
        if (data) {
            const list = data.hits.map(m => ({
                id: m.id,
                name: m.name,
                categoryId: m.category ? m.category.id : 0,
                categoryCode: m.category ? m.category.code : 0,
                categoryName: m.category ? m.category.name : '',
                categoryType: m.category ? m.category.type : undefined,
                categoryDescription: m.category ? m.category.description : '',
                brandId: m.brand ? m.brand.id : 0,
                brandCode: m.brand ? m.brand.code : 0,
                brandName: m.brand ? m.brand.name : '',
            }));

            const dataList = list.slice(offset, offset + limit);
            store.commit('attributeSet/setSearchResults', {
                data: dataList,
                total: data.total,
            });
            store.commit('attributeSet/setAllResults', { data: list, total: data.total });
        }

        store.commit('attributeSet/setSearchLoading', false);
    };

    return {
        searchResult,
        search,
        collectSearchPayload,
    };
};

export { useSearch };
