import { createActionTypes } from '../../utils';

export const AUTH = createActionTypes('AUTH', [
  'LOGIN',
  'REGISTER',
  'FORGOT_PASSWORD',
  'RESET_PASSWORD',
  'RESET_PASSWORD_TOKEN_VERIFY',
  'LOGOUT',
  'SUCCESS',
  'REFRESH_TOKEN',
  'FAILURE',
  'ME',
]);

export default AUTH;
