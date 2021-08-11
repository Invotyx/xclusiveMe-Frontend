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
};
