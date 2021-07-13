import { createAction } from '../../utils';
import { POST } from './types';

export const post = {
  request: () =>
    createAction(POST.GET, {
      fetching: true,
      success: false,
      error: null,
    }),
  requestSubscribed: () =>
    createAction(POST.GET_SUBSCRIBED, {
      fetching: true,
      success: false,
      error: null,
    }),
  requestX: data =>
    createAction(POST.GET_X, {
      ...data,
      xfeed: [],
      fetching: true,
      success: false,
      error: null,
    }),
  save: data =>
    createAction(POST.SAVE, {
      ...data,
      fetching: true,
      success: false,
      error: null,
    }),
  saveComment: data =>
    createAction(POST.ADD_COMMENT, {
      ...data,
      fetching: true,
      success: false,
      error: null,
    }),
  uploadImage: data =>
    createAction(POST.UPLOAD_IMAGE, {
      ...data,
      fetching: true,
      success: false,
      error: null,
    }),
  uploadVideoReq: data =>
    createAction(POST.UPLOAD_VIDEO_REQ, {
      ...data,
      fetching: true,
      success: false,
      error: null,
    }),
  uploadVideoFinalReq: data =>
    createAction(POST.UPLOAD_VIDEO_FINAL_REQ, {
      ...data,
      fetching: true,
      success: false,
      error: null,
    }),
  update: id =>
    createAction(POST.UPDATE, {
      id,
      fetching: true,
      success: false,
      error: null,
    }),
  delete: id =>
    createAction(POST.DELETE, {
      id,
      fetching: true,
      success: false,
      error: null,
    }),
  success: data =>
    createAction(POST.SUCCESS, {
      ...data,
      fetching: false,
      success: true,
      error: null,
    }),
  failure: error =>
    createAction(POST.FAILURE, {
      ...error,
      fetching: false,
      success: false,
    }),
};
