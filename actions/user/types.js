import { createActionTypes } from '../../utils';

export const USER = createActionTypes('USER', [
  'LOGIN',
  'REGISTER',
  'FORGOT_PASSWORD',
  'RESET_PASSWORD',
  'RESET_PASSWORD_TOKEN_VERIFY',
  'LOGOUT',
  'SUCCESS',
  'FAILURE',
]);

export default USER;
