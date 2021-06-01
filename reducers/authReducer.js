import { fromJS } from 'immutable';
import { AUTH } from '../actions/auth/types';

const initialState = fromJS({
  fetching: false,
  success: false,
  error: null,
  loggedIn: false,
  currentUser: null,
  userSessions: [],
  countriesList: [],
});

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH.LOGIN:
    case AUTH.REGISTER:
    case AUTH.VERIFY_OTP:
    case AUTH.RESEND_OTP:
    case AUTH.UPDATE_PROFILE:
    case AUTH.UPDATE_PASSWORD:
    case AUTH.UPDATE_SUBSCRIPTION_FEE:
    case AUTH.UPLOAD_IMAGE:
    case AUTH.UPLOAD_COVER:
    case AUTH.FORGOT_PASSWORD:
    case AUTH.REFRESH_TOKEN:
    case AUTH.ME:
    case AUTH.UPDATE_TWO_FACTOR_AUTHENTICATION:
    case AUTH.GET_SESSIONS:
    case AUTH.EXPIRE_ALL_SESSIONS:
    case AUTH.LOGOUT:
    case AUTH.SUCCESS:
    case AUTH.FAILURE:
    case AUTH.GET_COUNTRIES:
      return state.merge(action.payload);
    default:
      return state;
  }
}
