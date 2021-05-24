import { createActionTypes } from '../../utils';

export const POST = createActionTypes('POST', [
  'GET',
  'SAVE',
  'UPDATE',
  'DELETE',
  'SUCCESS',
  'FAILURE',
]);

export default POST;
