import { fromJS } from 'immutable';
import { POST } from '../actions/post/types';

const initialState = fromJS({
  data: [],
  subscribed: [],
  xfeed: [],
  fetching: false,
  success: false,
  error: null,
});

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case POST.GET:
    case POST.GET_SUBSCRIBED:
    case POST.GET_X:
    case POST.SUCCESS:
    case POST.UPDATE:
    case POST.DELETE:
    case POST.FAILURE:
      return state.merge(action.payload);
    default:
      return state;
  }
}
