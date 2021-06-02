import React from 'react';
import { useDispatch } from 'react-redux';
import { post } from '../../actions/post';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import VideocamOutlinedIcon from '@material-ui/icons/VideocamOutlined';
import * as UpChunk from '@mux/upchunk';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: '#666',
  },
}));

export default function FormDialog({
  onUploadVideo,
  set_Loading,
  set_disabled,
}) {
  const dispatch = useDispatch();
  const inputFile = React.useRef(null);
  const classes = useStyles();

  const onChangeFile = (event) => {
    event.stopPropagation();
    event.preventDefault();
    var video = event.target.files[0];
    if (video) {
      set_Loading(true);
      set_disabled(true);
    }
    dispatch(
      post.uploadVideoReq({
        fileObject: 1,
        callback: (res) => {
          const upload = UpChunk.createUpload({
            // getUploadUrl is a function that resolves with the upload URL generated
            // on the server-side
            endpoint: res.url,
            // picker here is a file picker HTML element
            file: video,
            chunkSize: 5120, // Uploads the file in ~5mb chunks
          });

          // subscribe to events
          upload.on('error', (err) => {
            console.error('', err.detail);
          });

          upload.on('progress', (progress) => {
            console.log('Uploaded', progress.detail, 'percent of this file.');
            onUploadVideo(res.id, video.type);
          });

          // subscribe to events
          upload.on('success', (err) => {
            set_Loading(false);
            set_disabled(false);
            console.log("Wrap it up, we're done here.");
          });
        },
      })
    );
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

      <IconButton
        size='small'
        onClick={() => {
          inputFile.current.click();
        }}
      >
        <VideocamOutlinedIcon className={classes.icon} />
      </IconButton>
    </>
  );
}
