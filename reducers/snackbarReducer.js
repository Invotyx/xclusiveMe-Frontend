import { fromJS } from 'immutable';
import { SNACKBAR } from '../actions/snackbar/types';

const initialState = fromJS({
  severity: 'info', // other options: error, success, warning
  message: '',
  autoHideDuration: 6000,
  open: false,
});

export default function snackbarReducer(state = initialState, action) {
  switch (action.type) {
    case SNACKBAR.UPDATE:
      return state.merge(action.payload);
    default:
      return state;
  }
}
