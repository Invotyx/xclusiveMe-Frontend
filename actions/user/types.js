import { createActionTypes } from '../../utils';

export const USER = createActionTypes('USER', [
  'GET',
  'GET_ONE',
  'SEARCH',
  'EMPTY_SEARCH_LIST',
  'SAVE',
  'PUT',
  'PATCH',
  'DELETE',
  'SUCCESS',
  'FAILURE',
]);

export default USER;
