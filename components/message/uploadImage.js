import React from 'react';
import { useDispatch } from 'react-redux';
import { post } from '../../actions/post';
import WallpaperOutlinedIcon from '@material-ui/icons/WallpaperOutlined';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import UploadFile from '../UploadFile';

export default function FormDialog({
  imageHandler,
  set_disabled,
  onImageSelect,
  onImageUploaded,
  children,
}) {
  const Children = props => React.cloneElement(children, props);
  const dispatch = useDispatch();

  const onChangeFile = files => {
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const image = files[i];
        var temp = URL.createObjectURL(image);
        onImageSelect && onImageSelect(temp);
      }
      set_disabled(true);
      dispatch(
        post.uploadImage({
          fileObject: files,
          callback: source_url => {
            imageHandler(source_url);
            set_disabled(false);
            event.target.value = null;
            onImageUploaded && onImageUploaded();
          },
        })
      );
    }
  };

  return (
    <>
      <UploadFile
        handleFileChange={onChangeFile}
        inputProps={{
          accept: 'image/*',
          multiple: true,
        }}
      >
        {children ? (
          <Children />
        ) : (
          <Box clone color='#666'>
            <IconButton>
              <WallpaperOutlinedIcon />
            </IconButton>
          </Box>
        )}
      </UploadFile>
    </>
  );
}
