import { createActionTypes } from '../../utils';

export const AUTH = createActionTypes('AUTH', [
  'LOGIN',
  'REGISTER',
  'VERIFY_OTP',
  'RESEND_OTP',
  'UPDATE_PROFILE',
  'FORGOT_PASSWORD',
  'RESET_PASSWORD',
  'RESET_PASSWORD_TOKEN_VERIFY',
  'LOGOUT',
  'SUCCESS',
  'REFRESH_TOKEN',
  'FAILURE',
  'ME',
  'UPDATE_TWO_FACTOR_AUTHENTICATION',
]);

export default AUTH;
