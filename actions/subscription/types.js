import { createActionTypes } from '../../utils';

export const SUBSCRIPTION = createActionTypes('SUBSCRIPTION', [
  'GET',
  'ADD',
  'REMOVE',
  'SUCCESS',
  'FAILURE',
]);

export default SUBSCRIPTION;
