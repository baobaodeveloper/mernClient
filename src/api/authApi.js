import apiClient from './apiClient';

export const authApi = {
  register(user) {
    const url = '/auth/register';
    return apiClient.post(url, user);
  },
  login(user) {
    const url = '/auth/login';
    return apiClient.post(url, user);
  },
};
