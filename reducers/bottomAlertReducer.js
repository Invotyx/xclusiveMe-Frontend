import { fromJS } from 'immutable';
import { BOTTOMALERT } from '../actions/bottom-alert/types';

const initialState = fromJS({
  severity: 'info', // other options: error, success, warning
  message: '',
  autoHideDuration: 6000,
  open: false,
});

export default function bottomAlertReducer(state = initialState, action) {
  switch (action.type) {
    case BOTTOMALERT.UPDATE:
      return state.merge(action.payload);
    default:
      return state;
  }
}
