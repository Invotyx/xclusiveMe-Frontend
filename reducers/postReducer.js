import { fromJS } from 'immutable';
import { POST } from '../actions/post/types';

const initialState = fromJS({
  data: [],
  data: [],
  notiData: [],
  subscribed: [],
  xfeed: [],
  xfeed_numberOfPosts: 0,
  fetching: false,
  success: false,
  error: null,
  numberOfPosts: 0,
});

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case POST.GET:
    case POST.GET_ONE:
    case POST.PURCHASE_POST:
    case POST.GET_SUBSCRIBED:
    case POST.GET_X:
    case POST.SUCCESS:
    case POST.UPDATE:
    case POST.DELETE:
    case POST.FAILURE:
    case POST.ADD_COMMENT:
    case POST.ADD_LIKE:
    case POST.DELETE_LIKES:
    case POST.COMMENT_LIKE:
    case POST.DEL_COMMENT_LIKE:
    case POST.GET_COMMENTS:
    case POST.GET_REPLIES:
    case POST.GET_NOTIFICATIONS:
    case POST.VIEW_NOTIFICATION:
    case POST.GET_SETTING_NOTIFICATIONS:
    case POST.ADD_SETTING_NOTIFICATIONS:
    case POST.TIP:
      return state.merge(action.payload);
    default:
      return state;
  }
}
