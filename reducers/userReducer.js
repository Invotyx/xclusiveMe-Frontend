import { fromJS } from 'immutable';
import { USER } from '../actions/user/types';

const initialState = fromJS({
  fetching: false,
  success: false,
  error: null,
  loggedIn: false,
  currentUser: null,
});

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER.LOGIN:
    case USER.REGISTER:
    case USER.FORGOT_PASSWORD:
    case USER.LOGOUT:
      return state.merge(action.payload);
    default:
      return state;
  }
}
