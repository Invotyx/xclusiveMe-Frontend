import React from 'react';
import { useDispatch } from 'react-redux';
import { post } from '../../actions/post';
import WallpaperOutlinedIcon from '@material-ui/icons/WallpaperOutlined';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';

export default function FormDialog({
  imageHandler,
  set_disabled,
  onImageSelect,
  onImageUploaded,
}) {
  const dispatch = useDispatch();
  const inputFile = React.useRef(null);

  const onChangeFile = event => {
    event.stopPropagation();
    event.preventDefault();
    var temp = URL.createObjectURL(event.target.files[0]);
    onImageSelect && onImageSelect(temp);
    var images = event.target.files;
    // if (image) {
    set_disabled(true);
    dispatch(
      post.uploadImage({
        fileObject: images,
        callback: source_url => {
          imageHandler(source_url);
          set_disabled(false);
          event.target.value = null;
          onImageUploaded && onImageUploaded();
        },
      })
    );
    // }
  };

  return (
    <>
      <input
        accept='image/*'
        type='file'
        ref={inputFile}
        style={{ display: 'none' }}
        onChange={onChangeFile}
        multiple
      />

      <Box clone color='#666'>
        <IconButton
          size='small'
          onClick={() => {
            inputFile.current.click();
          }}
        >
          <WallpaperOutlinedIcon />
        </IconButton>
      </Box>
    </>
  );
}
