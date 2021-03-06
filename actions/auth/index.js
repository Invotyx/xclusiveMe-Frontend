import { createAction } from '../../utils';
import { AUTH } from './types';

export const auth = {
  login: data =>
    createAction(AUTH.LOGIN, {
      ...data,
      fetching: true,
      success: false,
      error: null,
    }),
  getCountriesList: () => createAction(AUTH.GET_COUNTRIES),
  refreshToken: data =>
    createAction(AUTH.REFRESH_TOKEN, {
      ...data,
      fetching: true,
      success: false,
      error: null,
    }),
  register: data =>
    createAction(AUTH.REGISTER, {
      ...data,
      fetching: true,
      success: false,
      error: null,
    }),
  verifyOtp: data =>
    createAction(AUTH.VERIFY_OTP, {
      ...data,
      fetching: true,
      success: false,
      error: null,
    }),
  resendOtp: data =>
    createAction(AUTH.RESEND_OTP, {
      ...data,
      fetching: true,
      success: false,
      error: null,
    }),
  updateProfile: data =>
    createAction(AUTH.UPDATE_PROFILE, {
      ...data,
      fetching: true,
      success: false,
      error: null,
    }),
  updatePassword: data =>
    createAction(AUTH.UPDATE_PASSWORD, {
      ...data,
      fetching: true,
      success: false,
      error: null,
    }),
  updateSubscriptionFee: data =>
    createAction(AUTH.UPDATE_SUBSCRIPTION_FEE, {
      ...data,
      fetching: true,
      success: false,
      error: null,
    }),
  uploadImage: data =>
    createAction(AUTH.UPLOAD_IMAGE, {
      ...data,
      fetching: true,
      uploadingProfileImage: true,
      success: false,
      error: null,
    }),
  uploadCover: data =>
    createAction(AUTH.UPLOAD_COVER, {
      ...data,
      uploadingCover: true,
      success: false,
      error: null,
    }),
  forgotPassword: data =>
    createAction(AUTH.FORGOT_PASSWORD, {
      ...data,
      fetching: true,
      success: false,
      error: null,
    }),
  resetPassword: data =>
    createAction(AUTH.RESET_PASSWORD, {
      ...data,
      fetching: true,
      success: false,
      error: null,
    }),
  resetPasswordVerify: data =>
    createAction(AUTH.RESET_PASSWORD_TOKEN_VERIFY, {
      ...data,
      fetching: true,
      success: false,
      error: null,
    }),
  getSessions: data =>
    createAction(AUTH.GET_SESSIONS, {
      ...data,
      fetching: true,
      success: false,
      error: null,
    }),
  expireAllSessions: data =>
    createAction(AUTH.EXPIRE_ALL_SESSIONS, {
      ...data,
      fetching: true,
      success: false,
      error: null,
    }),
  logout: data => createAction(AUTH.LOGOUT, { ...data, loggedIn: false }),
  me: () =>
    createAction(AUTH.ME, {
      fetching: true,
      success: false,
      error: null,
    }),
  requestFollowers: () =>
    createAction(AUTH.REQUEST_FOLLOWERS, {
      fetching: true,
      success: false,
      error: null,
    }),
  requestFollowings: data =>
    createAction(AUTH.REQUEST_FOLLOWINGS, {
      ...data,
      fetching: true,
      success: false,
      error: null,
    }),
  updateTwoFactorAuthentication: data =>
    createAction(AUTH.UPDATE_TWO_FACTOR_AUTHENTICATION, {
      ...data,
      fetching: true,
      success: false,
      error: null,
    }),
  updateAgeLimitRestriction: data =>
    createAction(AUTH.UPDATE_AGE_LIMIT_RESTRICTION, {
      ...data,
      fetching: true,
      success: false,
      error: null,
    }),
  success: data =>
    createAction(AUTH.SUCCESS, {
      ...data,
      fetching: false,
      success: true,
      error: null,
    }),
  failure: error =>
    createAction(AUTH.FAILURE, {
      ...error,
      fetching: false,
      uploadingProfileImage: false,
      uploadingCover: false,
      success: false,
    }),
  redirectToLoginPage: asPath =>
    createAction(AUTH.REDIRECT_TO_LOGIN_PAGE, { asPath }),
};
