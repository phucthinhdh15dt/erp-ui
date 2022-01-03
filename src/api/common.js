import { apiGenerator } from '@/helpers/api';
import { API_NAME } from '@/configs/api';

export default axios => ({
    //location
    getLocation({ name, parentId, type }) {
        const api = apiGenerator(axios, API_NAME.GET_LOCATION, { query: { name, parentId, type } });
        return api.call();
    },
    //user
    getUser(phone) {
        const api = apiGenerator(axios, API_NAME.GET_USER, { query: { phone } });
        return api.call();
    },
});
