import apiConfigs from '@/configs/api';
import { template, isEmpty } from 'lodash/fp';
import urlencoded from 'form-urlencoded';

const apiCaller = (axios, { url, method, payload = {} }) =>
    axios.request({
        url,
        method,
        data: payload,
    });

const apiGenerator = (axios, apiName, data = {}) => {
    const { params = {}, query = {}, payload = {} } = data;
    const { endpoint, module, version, method } = apiConfigs[apiName];
    const templateCompiler = template(endpoint);
    const urlCompiled = templateCompiler(params);
    const pathModule = module ? `/${module}` : '';
    const path = `${version}${pathModule}/${urlCompiled}`;
    const queryCompiled = !isEmpty(query) ? `?${urlencoded(query)}` : '';
    const url = path + queryCompiled;

    return {
        call: () => apiCaller(axios, { url, method, payload }),
    };
};

export { apiGenerator, apiCaller };
