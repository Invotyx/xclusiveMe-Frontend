import { fromJS, List } from 'immutable';
import { EMPLOYEE } from '../actions/employee/types';

const initialState = fromJS({
  data: new List([]),
  fetching: false,
  success: false,
  error: null,
});

export default function employeeReducer(state = initialState, action) {
  switch (action.type) {
    case EMPLOYEE.GET:
    case EMPLOYEE.GET_ONE:
    case EMPLOYEE.SAVE:
    case EMPLOYEE.UPDATE:
    case EMPLOYEE.DELETE:
    case EMPLOYEE.SUCCESS:
    case EMPLOYEE.FAILURE:
      return state.merge(action.payload);
    default:
      return state;
  }
}
