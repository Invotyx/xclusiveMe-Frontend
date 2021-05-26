import { fromJS } from 'immutable';
import { PAYMENT_METHOD } from '../actions/payment-method/types';

const initialState = fromJS({
  data: [],
  fetching: false,
  success: false,
  error: null,
});

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case PAYMENT_METHOD.GET:
    case PAYMENT_METHOD.SUCCESS:
    case PAYMENT_METHOD.SET_DEFAULT:
    case PAYMENT_METHOD.DELETE:
      return state.merge(action.payload);
    default:
      return state;
  }
}
