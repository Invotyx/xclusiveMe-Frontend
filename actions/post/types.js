import { createActionTypes } from '../../utils';

export const POST = createActionTypes('POST', [
  'GET',
  'GET_SUBSCRIBED',
  'GET_X',
  'SAVE',
  'UPDATE',
  'DELETE',
  'SUCCESS',
  'FAILURE',
]);

export default POST;
