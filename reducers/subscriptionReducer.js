import { fromJS, List } from 'immutable';
import { SUBSCRIPTION } from '../actions/subscription/types';

const initialState = fromJS({
  data: new List([]),
  fetching: false,
  success: false,
  error: null,
});

export default function subscriptionReducer(state = initialState, action) {
  switch (action.type) {
    case SUBSCRIPTION.GET:
    case SUBSCRIPTION.ADD:
    case SUBSCRIPTION.REMOVE:
    case SUBSCRIPTION.SUCCESS:
    case SUBSCRIPTION.FAILURE:
      return state.merge(action.payload);
    default:
      return state;
  }
}
