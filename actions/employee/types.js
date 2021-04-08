import { createActionTypes } from '../../utils';

export const EMPLOYEE = createActionTypes('EMPLOYEE', [
  'GET',
  'GET_ONE',
  'SAVE',
  'PUT',
  'PATCH',
  'DELETE',
  'SUCCESS',
  'FAILURE',
]);

export default EMPLOYEE;
