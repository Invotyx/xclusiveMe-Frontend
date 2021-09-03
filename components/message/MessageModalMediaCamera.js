import React from 'react';
import Webcam from 'react-webcam';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import { post } from '../../actions/post';

export default function MessageModalMediaCamera({
  imageHandler,
  handleClose,
}) {
  const dispatch = useDispatch();
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);

    dispatch(
      post.uploadImage({
        fileObject: [dataURItoBlob(imageSrc)],
        callback: data => {
          imageHandler(data);
        },
      })
    );
  }, [webcamRef, setImgSrc]);

  const reset = () => {
    setImgSrc(null);
  };

  return (
    <>
      {imgSrc ? (
        <>
          <img src={imgSrc} />
          <Box display='flex' justifyContent='center'>
            <Button
              variant='outlined'
              size='small'
              onClick={reset}
            >
              Retake
            </Button>
            {handleClose && (
              <Button size='small' onClick={handleClose}>
                Close
              </Button>
            )}
          </Box>
        </>
      ) : (
        <>
          <Webcam
            ref={webcamRef}
            screenshotFormat='image/jpeg'
            mirrored={true}
            style={{ maxWidth: '500px', maxHeight: '500px' }}
          />
          <Box display='flex' justifyContent='center'>
            <Button variant='outlined' size='small' onClick={capture}>
              Capture
            </Button>
            {handleClose && (
              <Button size='small' onClick={handleClose}>
                Close
              </Button>
            )}
          </Box>
        </>
      )}
    </>
  );
}

function dataURItoBlob(dataURI) {
  var byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0)
    byteString = atob(dataURI.split(',')[1]);
  else byteString = unescape(dataURI.split(',')[1]);

  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], { type: mimeString });
}
