import { createActionTypes } from '../../utils';

export const AUTH = createActionTypes('AUTH', [
  'LOGIN',
  'REGISTER',
  'FORGOT_PASSWORD',
  'RESET_PASSWORD',
  'RESET_PASSWORD_TOKEN_VERIFY',
  'LOGOUT',
  'SUCCESS',
  'FAILURE',
]);

export default AUTH;
