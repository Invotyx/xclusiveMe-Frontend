import { createActionTypes } from '../../utils';

export const CHAT = createActionTypes('CHAT', [
  'GET',
  'SEND',
  'GET_ONE',
  'IS_SEEN',
  'SUCCESS',
  'FAIL',
]);

export default CHAT;
