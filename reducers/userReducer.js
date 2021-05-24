import { fromJS, List } from 'immutable';
import { USER } from '../actions/user/types';

const initialState = fromJS({
  data: new List([]),
  fetching: false,
  success: false,
  error: null,
});

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER.GET:
    case USER.GET_ONE:
    case USER.SEARCH:
    case USER.SAVE:
    case USER.UPDATE:
    case USER.DELETE:
    case USER.SUCCESS:
    case USER.FAILURE:
      return state.merge(action.payload);
    default:
      return state;
  }
}
