import { fromJS } from 'immutable';
import CHAT from '../actions/chat/types';

const initialState = fromJS({
  data: [],
  chats: [],
  fetching: false,
  success: false,
  error: null,
});

export default function chatReducer(state = initialState, action) {
  switch (action.type) {
    case CHAT.SEND:
    case CHAT.SEND_ONE:
    case CHAT.GET:
    case CHAT.GET_ONE:
    case CHAT.SUCCESS:
    case CHAT.FAIL:
      return state.merge(action.payload);
    default:
      return state;
  }
}
