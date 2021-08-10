import axios from 'axios';

const apiClient = axios.create();

apiClient.interceptors.request.use(
  async request => {
    const accessToken = localStorage.getItem('jwtToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (accessToken) {
      request.headers = {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'refresh-cookie': refreshToken,
      };
    } else {
      request.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
    }
    return request;
  },
  error => Promise.reject(error)
);

export default apiClient;
