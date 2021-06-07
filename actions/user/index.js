import { createAction } from '../../utils';
import { USER } from './types';

export const user = {
  request: () =>
    createAction(USER.GET, {
      fetching: true,
      success: false,
      error: null,
    }),
  requestOne: id =>
    createAction(USER.GET_ONE, {
      id,
      fetching: true,
      success: false,
      error: null,
    }),
  search: data =>
    createAction(USER.SEARCH, {
      ...data,
      fetching: true,
      success: false,
      error: null,
    }),
  emptySearchList: () =>
    createAction(USER.EMPTY_SEARCH_LIST, {
      data: [],
      fetching: false,
      success: false,
      error: null,
    }),
  save: data =>
    createAction(USER.SAVE, {
      ...data,
      fetching: true,
      success: false,
      error: null,
    }),
  put: (id, data) =>
    createAction(USER.PUT, {
      id,
      ...data,
      fetching: true,
      success: false,
      error: null,
    }),
  patch: (id, data) =>
    createAction(USER.PATCH, {
      id,
      ...data,
      fetching: true,
      success: false,
      error: null,
    }),
  delete: id =>
    createAction(USER.DELETE, {
      id,
      fetching: true,
      success: false,
      error: null,
    }),
  success: data =>
    createAction(USER.SUCCESS, {
      ...data,
      fetching: false,
      success: true,
      error: null,
    }),
  failure: error =>
    createAction(USER.FAILURE, {
      ...error,
      fetching: false,
      success: false,
    }),
};
