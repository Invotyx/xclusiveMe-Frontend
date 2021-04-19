import { createAction } from '../../utils';
import { AUTH } from './types';

export const auth = {
  login: (data) =>
    createAction(AUTH.LOGIN, {
      ...data,
      fetching: true,
      success: false,
      error: null,
    }),
  refreshToken: (data) =>
    createAction(AUTH.REFRESH_TOKEN, {
      ...data,
      fetching: true,
      success: false,
      error: null,
    }),
  register: (data) =>
    createAction(AUTH.REGISTER, {
      ...data,
      fetching: true,
      success: false,
      error: null,
    }),
  updateProfile: (data) =>
    createAction(AUTH.UPDATE_PROFILE, {
      ...data,
      fetching: true,
      success: false,
      error: null,
    }),
  forgotPassword: (data) =>
    createAction(AUTH.FORGOT_PASSWORD, {
      ...data,
      fetching: true,
      success: false,
      error: null,
    }),
  resetPassword: (data) =>
    createAction(AUTH.RESET_PASSWORD, {
      ...data,
      fetching: true,
      success: false,
      error: null,
    }),
  resetPasswordVerify: (data) =>
    createAction(AUTH.RESET_PASSWORD_TOKEN_VERIFY, {
      ...data,
      fetching: true,
      success: false,
      error: null,
    }),
  logout: (callback) =>
    createAction(AUTH.LOGOUT, { callback, loggedIn: false }),
  me: () =>
    createAction(AUTH.ME, {
      fetching: true,
      success: false,
      error: null,
    }),
  success: (data) =>
    createAction(AUTH.SUCCESS, {
      ...data,
      fetching: false,
      success: true,
      error: null,
    }),
  failure: (error) =>
    createAction(AUTH.FAILURE, { ...error, fetching: false, success: false }),
};
