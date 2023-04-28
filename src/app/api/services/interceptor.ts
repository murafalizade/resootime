import API_BASE_URL from '@/app/constants/baseUrl';
import Cookie from '@/app/utils/Cookie';
import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
} from 'axios';
import Router from 'next/router';

// Configure request params
const config: AxiosRequestConfig = {
    baseURL: API_BASE_URL,
    timeout: 30000,
};
const service: AxiosInstance = axios.create(config);

// Intercept request
service.interceptors.request.use(
    (config) => {
        config.headers = config.headers ?? {};
        const accessToken = config.headers['permanent-token'];
        console.log(accessToken);
        // Check the access token
        if (accessToken) {
            config.headers['Authorization'] = `Token ${accessToken}`;
            delete config.headers['permanent-token'];
            console.log(config.headers['Authorization']);
        } else if (config.headers && !config.headers['public-request']) {
            Router.push('/login');

            return {
                ...config,
                cancelToken: new axios.CancelToken((cancel) =>
                    cancel('Cancel unauthorized request'),
                ),
            };
        }

        delete config.headers['public-request'];

        return config;
    },
    (error) => {
        Promise.reject(error);
    },
);

// Intercept response
service.interceptors.response.use(
    (response: AxiosResponse) => {
        return response.data;
    },
    (error: AxiosError) => {
        return Promise.reject(error.response?.data);
    },
);

export default service;
