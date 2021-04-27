import { createActionTypes } from '../../utils';

export const USER = createActionTypes('USER', [
  'GET',
  'GET_ONE',
  'SAVE',
  'PUT',
  'PATCH',
  'DELETE',
  'SUCCESS',
  'FAILURE',
]);

export default USER;
