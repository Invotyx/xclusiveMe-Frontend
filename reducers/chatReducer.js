import { fromJS } from 'immutable';
import CHAT from '../actions/chat/types';

const initialState = fromJS({
  data: [],
  fetching: false,
  success: false,
  error: null,
});

export default function chatReducer(state = initialState, action) {
  switch (action.type) {
    case CHAT.SEND:
    case CHAT.GET:
      return state.merge(action.payload);
    default:
      return state;
  }
}
