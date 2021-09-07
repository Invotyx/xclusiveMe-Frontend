import { createActionTypes } from '../../utils';

export const USER = createActionTypes('USER', [
  'GET',
  'GET_ALL',
  'GET_SUGGESTIONS',
  'GET_ONE',
  'GET_FOLLOWERS',
  'GET_FOLLOWINGS',
  'SEARCH',
  'EMPTY_SEARCH_LIST',
  'SAVE',
  'PUT',
  'PATCH',
  'DELETE',
  'REPORT_USER',
  'SUCCESS',
  'FAILURE',
]);

export default USER;
