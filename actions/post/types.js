import { createActionTypes } from '../../utils';

export const POST = createActionTypes('POST', [
  'GET',
  'GET_SUBSCRIBED',
  'GET_X',
  'SAVE',
  'UPDATE',
  'DELETE',
  'SUCCESS',
  'FAILURE',
  'UPLOAD_IMAGE',
  'UPLOAD_VIDEO_REQ',
  'UPLOAD_VIDEO_FINAL_REQ',
  'ADD_COMMENT',
  'ADD_LIKE',
]);

export default POST;
