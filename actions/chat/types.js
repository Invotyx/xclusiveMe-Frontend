import { createActionTypes } from '../../utils';

export const CHAT = createActionTypes('CHAT', [
  'GET',
  'SEND',
  'SEARCH_MESSAGES',
  'SEND_VOICEMAIL',
  'SEND_ONE',
  'GET_ONE',
  'GET_ONE_HISTORY',
  'PURCHASE_MESSAGE',
  'IS_SEEN',
  'SUCCESS',
  'FAIL',
  'UPDATE_ACTIVE_CONVERSATION_ID',
]);

export default CHAT;
