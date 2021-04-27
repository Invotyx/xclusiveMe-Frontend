import { createActionTypes } from '../../utils';

export const AUTH = createActionTypes('AUTH', [
  'LOGIN',
  'REGISTER',
  'VERIFY_OTP',
  'RESEND_OTP',
  'UPDATE_PROFILE',
  'UPLOAD_IMAGE',
  'UPLOAD_COVER',
  'FORGOT_PASSWORD',
  'RESET_PASSWORD',
  'GET_SESSIONS',
  'EXPIRE_ALL_SESSIONS',
  'LOGOUT',
  'SUCCESS',
  'REFRESH_TOKEN',
  'FAILURE',
  'ME',
  'UPDATE_TWO_FACTOR_AUTHENTICATION',
]);

export default AUTH;
