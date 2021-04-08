import axios from 'axios';

const apiClient = axios.create();

apiClient.interceptors.request.use(
  async (request) => {
    const accessToken = localStorage.getItem('jwtToken');
    if (accessToken) {
      request.headers = {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
    } else {
      request.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
    }
    return request;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default apiClient;
