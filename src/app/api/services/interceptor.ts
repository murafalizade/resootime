import API_BASE_URL from '@/app/constants/baseUrl';
import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
} from 'axios';

// Configure request params
const config: AxiosRequestConfig = {
    baseURL: API_BASE_URL,
    timeout: 30000,
};
const service: AxiosInstance = axios.create(config);

// Intercept request
// service.interceptors.request.use(
//   (config: AxiosRequestConfig) => {
//     config.headers = config.headers ?? {}
//     const accessToken = Cookie.get(AUTH_TOKEN_KEY)

//     // Check the access token
//     if (accessToken) {
//       config.headers['Authorization'] = `Bearer ${accessToken}`
//     } else if (config.headers && !config.headers[PUBLIC_REQUEST_KEY]) {
//       Router.push('/login')

//       return {
//         ...config,
//         cancelToken: new axios.CancelToken((cancel) =>
//           cancel('Cancel unauthorized request')
//         ),
//       }
//     }

//     delete config.headers[PUBLIC_REQUEST_KEY]

//     return config
//   },
//   (error) => {
//     Promise.reject(error)
//   }
// )

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
