import { createActionTypes } from '../../utils';

export const CHAT = createActionTypes('CHAT', [
  'GET',
  'SEND',
  'SEND_VOICEMAIL',
  'SEND_ONE',
  'GET_ONE',
  'IS_SEEN',
  'SUCCESS',
  'FAIL',
  'UPDATE_ACTIVE_CONVERSATION_ID',
]);

export default CHAT;
