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
            size: 10000,
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
        store.commit('list/setSearchLoading', true);
        const { offset, limit } = searchQuery;

        const payload = collectSearchPayload(searchQuery);
        const response = await api.search[`search${name}`](payload);
        const data = cloneDeep(response.data);

        if (data) {
            store.commit('list/setSearchResults', { data: data.hits.slice(offset, offset + limit), total: data.total });
            store.commit('list/setAllResults', { data: data.hits, total: data.total });
        }

        store.commit('list/setSearchLoading', false);
    };

    return {
        searchResult,
        search,
        collectSearchPayload,
    };
};

export { useSearch };
