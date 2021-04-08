import { fromJS } from 'immutable';
import { AUTH } from '../actions/auth/types';

const initialState = fromJS({
  fetching: false,
  success: false,
  error: null,
  loggedIn: false,
  currentUser: null,
});

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH.LOGIN:
    case AUTH.REGISTER:
    case AUTH.FORGOT_PASSWORD:
    case AUTH.LOGOUT:
      return state.merge(action.payload);
    default:
      return state;
  }
}
