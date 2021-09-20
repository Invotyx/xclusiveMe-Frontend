import React from 'react';
import { useDispatch } from 'react-redux';
import { post } from '../../actions/post';
import WallpaperOutlinedIcon from '@mui/icons-material/WallpaperOutlined';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
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

  return <>
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
          <IconButton size="large">
            <WallpaperOutlinedIcon />
          </IconButton>
        </Box>
      )}
    </UploadFile>
  </>;
}
