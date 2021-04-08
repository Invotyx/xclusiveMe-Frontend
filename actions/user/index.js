import { createAction } from '../../utils';
import { USER } from './types';

export const user = {
  login: (data) =>
    createAction(USER.LOGIN, {
      ...data,
      fetching: true,
      success: false,
      error: null,
    }),
  register: (data) =>
    createAction(USER.REGISTER, {
      ...data,
      fetching: true,
      success: false,
      error: null,
    }),
  forgotPassword: (data) =>
    createAction(USER.FORGOT_PASSWORD, {
      ...data,
      fetching: true,
      success: false,
      error: null,
    }),
  resetPassword: (data) =>
    createAction(USER.RESET_PASSWORD, {
      ...data,
      fetching: true,
      success: false,
      error: null,
    }),
  resetPasswordVerify: (data) =>
    createAction(USER.RESET_PASSWORD_TOKEN_VERIFY, {
      ...data,
      fetching: true,
      success: false,
      error: null,
    }),
  logout: () => createAction(USER.LOGOUT, { loggedIn: false }),
  success: (data) =>
    createAction(USER.SUCCESS, {
      ...data,
      fetching: false,
      success: true,
      error: null,
    }),
  failure: (error) =>
    createAction(USER.FAILURE, { ...error, fetching: false, success: false }),
};
