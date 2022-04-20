import axios, {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from 'axios';
import queryString from 'query-string';
import { BASE_CONSTANTS } from '../../../constants/base.constants';
import { getFromLocalStorage } from '../../../helpers/base.helpers';

const axiosClient = axios.create({
  baseURL: BASE_CONSTANTS.BASE_URL,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
    // 'Content-Type': 'multipart/form-data',

    'Access-Control-Allow-Origin': '*',
  },
  paramsSerializer: (params: Record<string, any>) => {
    return queryString.stringify(params);
  },
});

axiosClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = getFromLocalStorage('token'); //token is value
    const headers: AxiosRequestHeaders = {
      Authorization: `Bearer ${token}`,
    };

    if (token) config.headers = { ...config.headers, ...headers };
    return config;
  },
  (err) => {
    console.log(err.response);
    return Promise.reject(err);
  }
);
axiosClient.interceptors.response.use(
  (res: AxiosResponse) => {
    if (res && res.data) return res.data;
    return res;
  },
  (err) => {
    if (err.response && err.response.data) return err.response.data;
    return Promise.reject(err);
  }
);

export default axiosClient;
