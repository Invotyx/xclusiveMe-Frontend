import CHAT from './types';
import { createAction } from '../../utils';

export const chat = {
  sendMessage: data =>
    createAction(CHAT.SEND, {
      ...data,
      fetching: true,
      success: false,
      error: null,
    }),

  sendVoicemail: data =>
    createAction(CHAT.SEND_VOICEMAIL, {
      ...data,
      fetching: true,
      success: false,
      error: null,
    }),

  sendOneMessage: data =>
    createAction(CHAT.SEND_ONE, {
      ...data,
      fetching: true,
      success: false,
      error: null,
    }),

  purchaseMessage: data =>
    createAction(CHAT.PURCHASE_MESSAGE, {
      ...data,
      fetching: true,
      success: false,
      error: null,
    }),

  getConversations: data =>
    createAction(CHAT.GET, {
      ...data,
      fetching: true,
      success: false,
      error: null,
    }),

  getOneConversation: data =>
    createAction(CHAT.GET_ONE, {
      ...data,
      fetching: true,
      success: false,
      error: null,
    }),

  isSeenMessage: data =>
    createAction(CHAT.IS_SEEN, {
      ...data,
      fetching: true,
      success: false,
      error: null,
    }),

  success: data =>
    createAction(CHAT.SUCCESS, {
      ...data,
      fetching: false,
      success: true,
      error: null,
    }),
  failure: error =>
    createAction(CHAT.FAIL, {
      ...error,
      fetching: false,
      success: false,
    }),
  updateActiveConversationId: activeConversationId =>
    createAction(CHAT.UPDATE_ACTIVE_CONVERSATION_ID, {
      activeConversationId,
    }),
};
