import { createAction } from '../../utils';
import { POST } from './types';

export const post = {
  request: () =>
    createAction(POST.GET, {
      fetching: true,
      success: false,
      error: null,
    }),

  requestPurchased: () =>
    createAction(POST.GET_PURCHASED, {
      fetching: true,
      success: false,
      error: null,
    }),

  requestNotifications: () =>
    createAction(POST.GET_NOTIFICATIONS, {
      fetching: true,
      success: false,
      error: null,
    }),

  requestSettingsNotifications: () =>
    createAction(POST.GET_SETTING_NOTIFICATIONS, {
      fetching: true,
      success: false,
      error: null,
    }),

  addSettingNotification: data =>
    createAction(POST.ADD_SETTING_NOTIFICATIONS, {
      ...data,
      fetching: true,
      success: false,
      error: null,
    }),

  viewNotifications: data =>
    createAction(POST.VIEW_NOTIFICATION, {
      ...data,
      fetching: true,
      success: false,
      error: null,
    }),

  requestOne: id =>
    createAction(POST.GET_ONE, {
      id,
      fetching: true,
      success: false,
      error: null,
    }),

  purchasePost: id =>
    createAction(POST.PURCHASE_POST, {
      ...id,
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
  requestX: (data, doNotResetXFeed, skipFetching) => {
    let payload = {
      ...data,
      success: false,
      error: null,
    };
    if (!Boolean(skipFetching)) {
      payload.fetching = true;
    }
    if (!Boolean(doNotResetXFeed)) {
      payload.xfeed = [];
    }
    return createAction(POST.GET_X, payload);
  },
  requestReplies: data =>
    createAction(POST.GET_REPLIES, {
      ...data,
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

  getCommentsVal: data =>
    createAction(POST.GET_COMMENTS, {
      ...data,
      fetching: true,
      success: false,
      error: null,
    }),

  saveComment: data =>
    createAction(POST.ADD_COMMENT, {
      ...data,
      success: false,
      error: null,
    }),

  saveLike: id =>
    createAction(POST.ADD_LIKE, {
      ...id,
      success: false,
      error: null,
    }),

  saveCommentLike: id =>
    createAction(POST.COMMENT_LIKE, {
      ...id,
      success: false,
      error: null,
    }),

  delCommentLike: id =>
    createAction(POST.DEL_COMMENT_LIKE, {
      ...id,
      success: false,
      error: null,
    }),

  deleteLike: id =>
    createAction(POST.DELETE_LIKES, {
      ...id,
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

  postReport: data =>
    createAction(POST.REPORT_POST, {
      ...data,
      fetching: true,
      success: false,
      error: null,
    }),

  addTip: data =>
    createAction(POST.TIP, {
      ...data,
      fetching: true,
      success: false,
      error: null,
    }),
};
