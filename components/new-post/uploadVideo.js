import React from 'react';
import { useDispatch } from 'react-redux';
import { post } from '../../actions/post';
import IconButton from '@material-ui/core/IconButton';
import VideocamOutlinedIcon from '@material-ui/icons/VideocamOutlined';
import * as UpChunk from '@mux/upchunk';
import Box from '@material-ui/core/Box';

export default function uploadVideo({
  onUploadVideo,
  onVideoSelect,
  onVideoUploaded,
  onVideoUploadProgress,
  set_disabled,
}) {
  const dispatch = useDispatch();
  const inputFile = React.useRef(null);

  const onChangeFile = event => {
    event.stopPropagation();
    event.preventDefault();
    var video = event.target.files[0];
    if (video) {
      set_disabled(true);
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
              set_disabled(false);
            });

            upload.on('progress', progress => {
              console.log('Uploaded', progress.detail, 'percent of this file.');
              onVideoUploadProgress(progress.detail);
            });

            // subscribe to events
            upload.on('success', err => {
              set_disabled(false);
              onUploadVideo(res.id, video.type);
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

      <Box clone color='#666'>
        <IconButton
          size='small'
          onClick={() => {
            inputFile.current.click();
          }}
        >
          <VideocamOutlinedIcon />
        </IconButton>
      </Box>
    </>
  );
}
