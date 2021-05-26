import { createActionTypes } from '../../utils';

export const PAYMENT_METHOD = createActionTypes('PAYMENT_METHOD', [
  'GET',
  'SAVE',
  'SET_DEFAULT',
  'DELETE',
  'SUCCESS',
  'FAILURE',
]);

export default PAYMENT_METHOD;
