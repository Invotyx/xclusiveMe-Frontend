import { createActionTypes } from '../../utils';

export const PAYMENT = createActionTypes('PAYMENT', [
  'GET',
  'SUCCESS',
  'DELETE',
  'SET_DEFAULT',
  'ADD_PAYMENT',
]);

export default PAYMENT;
