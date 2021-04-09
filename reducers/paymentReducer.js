import { fromJS } from 'immutable';
import { PAYMENT } from '../actions/payment/types';

const initialState = fromJS({
  data: [],
  fetching: false,
  success: false,
  error: null,
});

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case PAYMENT.GET:
    case PAYMENT.SUCCESS:
    case PAYMENT.DELETE:
    case PAYMENT.SET_DEFAULT:
    case PAYMENT.ADD_PAYMENT:
      return state.merge(action.payload);
    default:
      return state;
  }
}
