import React from 'react';
import { useDispatch } from 'react-redux';
import { post } from '../actions/post';
import * as UpChunk from '@mux/upchunk';

export default function UploadVideo({
  onUploadVideoComplete,
  onVideoSelect,
  onVideoUploaded,
  onVideoUploadProgress,
  children,
  onVideoError,
}) {
  const Children = props => React.cloneElement(children, props);

  const dispatch = useDispatch();
  const inputFile = React.useRef(null);

  const onChangeFile = event => {
    event.stopPropagation();
    event.preventDefault();
    var video = event.target.files[0];
    if (video) {
      onVideoSelect && onVideoSelect();

      dispatch(
        post.uploadVideoReq({
          fileObject: 1,
          callback: res => {
            const upload = UpChunk.createUpload({
              // getUploadUrl is a function that resolves with the upload URL generated
              // on the server-side
              endpoint: res.url,
              // picker here is a file picker HTML element
              file: video,
              chunkSize: 5120, // Uploads the file in ~5mb chunks
            });

            // subscribe to events
            upload.on('error', err => {
              console.error('', err.detail);
              onVideoError(err);
            });

            upload.on('progress', progress => {
              console.log('Uploaded', progress.detail, 'percent of this file.');
              onVideoUploadProgress(progress.detail);
            });

            // subscribe to events
            upload.on('success', err => {
              onUploadVideoComplete(res.id, video.type, res);
              onVideoUploaded && onVideoUploaded();
              event.target.value = null;
              console.log("Wrap it up, we're done here.");
            });
          },
        })
      );
    }
  };

  return (
    <>
      <input
        accept='video/*'
        type='file'
        ref={inputFile}
        style={{ display: 'none' }}
        onChange={onChangeFile}
      />

      <Children
        onClick={() => {
          inputFile.current.click();
        }}
      />
    </>
  );
}
