import apiClient from './axiosInterceptor';
import { auth } from '../actions/auth';
import Router from 'next/router';

const UNAUTHORIZED = 401;
const interceptor = (dispatch) => {
  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      try {
        const { status } = error.response;
        if (status === UNAUTHORIZED) {
          dispatch(auth.redirectToLoginPage(Router.router.asPath));
          // dispatch(
          //   auth.refreshToken({
          // // callback: () => apiClient.request(error.config),
          //   })
          // );
        }
      } catch (e) {
        console.log(e);
      }
      return Promise.reject(error);
    }
  );
};
export default interceptor;
