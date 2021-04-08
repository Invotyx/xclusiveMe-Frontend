import { createAction } from '../../utils';
import { EMPLOYEE } from './types';

export const employee = {
  request: () =>
    createAction(EMPLOYEE.GET, {
      fetching: true,
      success: false,
      error: null,
    }),
  requestOne: (id) =>
    createAction(EMPLOYEE.GET_ONE, {
      id,
      fetching: true,
      success: false,
      error: null,
    }),
  save: (data) =>
    createAction(EMPLOYEE.SAVE, {
      ...data,
      fetching: true,
      success: false,
      error: null,
    }),
  put: (id, data) =>
    createAction(EMPLOYEE.PUT, {
      id,
      ...data,
      fetching: true,
      success: false,
      error: null,
    }),
  patch: (id, data) =>
    createAction(EMPLOYEE.PATCH, {
      id,
      ...data,
      fetching: true,
      success: false,
      error: null,
    }),
  delete: (id) =>
    createAction(EMPLOYEE.DELETE, {
      id,
      fetching: true,
      success: false,
      error: null,
    }),
  success: (data) =>
    createAction(EMPLOYEE.SUCCESS, {
      ...data,
      fetching: false,
      success: true,
      error: null,
    }),
  failure: (error) =>
    createAction(EMPLOYEE.FAILURE, {
      ...error,
      fetching: false,
      success: false,
    }),
};
