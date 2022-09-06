import axios from 'axios';
import { BASE_URL } from '../constants/common';

const apiClient = axios.create({
  baseURL: BASE_URL,
});

// Interceptors

// Add a request interceptor
apiClient.interceptors.request.use(
  async function (config) {
    // Do something before request is sent
    const authen = await JSON.parse(localStorage.getItem('token'));
    config.headers = { Authorization: `Bearer ${authen}` };

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
apiClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default apiClient;
