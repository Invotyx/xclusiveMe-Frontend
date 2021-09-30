import apiClient from './axiosInterceptor';
import { auth } from '../actions/auth';
import Router from 'next/router';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const SERVER_ADDRESS = publicRuntimeConfig.backendUrl;

const UNAUTHORIZED = 401;
const axiosInterceptorResponse = dispatch => {
  apiClient.interceptors.response.use(
    response => response,
    async error => {
      try {
        const { status } = error.response;
        if (
          status === UNAUTHORIZED &&
          error.config.url.indexOf('/auth/refresh') === -1
        ) {
          if (!Boolean(localStorage.getItem('refreshToken'))) {
            Router.router.push('/login');
            return Promise.reject(error);
          }
          const refreshResponse = await apiClient
            .get(`${SERVER_ADDRESS}/auth/refresh`)
            .then(response => ({ ...response }))
            .catch(error => ({ ...error }));
          if (Boolean(refreshResponse.isAxiosError)) {
            // logout
            dispatch(auth.redirectToLoginPage(Router.router.asPath));
          } else {
            localStorage.setItem('jwtToken', refreshResponse.data.accessToken);
            localStorage.setItem(
              'refreshToken',
              refreshResponse.data.refreshToken
            );
            // retry request
            const retryResponse = await apiClient.request(error.config);
            return Promise.resolve(retryResponse);
          }
        }
      } catch (e) {
        console.log(e);
      }
      return Promise.reject(error);
    }
  );
};
export default axiosInterceptorResponse;
