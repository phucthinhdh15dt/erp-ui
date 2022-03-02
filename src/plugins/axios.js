import axios from 'axios';
// import { useStore } from 'vuex';
// import snakecaseKeys from 'snakecase-keys';
// import camelcaseKeys from 'camelcase-keys';
import { message } from 'ant-design-vue';
import { useAuth } from '@/composables/auth';
import exceptionHandler from '@/helpers/exceptions';
// import httpStatus from '@/constants/httpStatus';

const axiosInstance = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    headers: {
        common: {
            'Content-Type': 'application/json; charset=utf-8',
        },
    },
    crossorigin: true,
});

axiosInstance.interceptors.request.use(request => {
    const { accessToken } = useAuth();

    if (accessToken.value) request.headers.Authorization = `Bearer ${accessToken.value}`;

    // if (['put', 'post'].includes(request.method)) {
    //     request.data = snakecaseKeys(request.data, { deep: true });
    // }

    return request;
});

axiosInstance.interceptors.response.use(
    response => {
        return { ...response.data, success: true };
        // return camelcaseKeys(response.data, { deep: true });
    },
    error => {
        let errorInfo = {
            code: 'Undefined',
            message: 'Lỗi không xác định',
        };
        if (error.response) {
            const { status, data } = error.response;
            errorInfo = exceptionHandler(status, data);
        }

        message.error(errorInfo.message);
        return { error: errorInfo };
    }
);

export default axiosInstance;
