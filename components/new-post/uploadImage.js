import React from 'react';
import { useDispatch } from 'react-redux';
import { post } from '../../actions/post';
import WallpaperOutlinedIcon from '@material-ui/icons/WallpaperOutlined';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: '#666',
  },
}));

export default function FormDialog({
  imageHandler,
  set_disabled,
}) {
  const dispatch = useDispatch();
  const inputFile = React.useRef(null);
  const classes = useStyles();

  const onChangeFile = event => {
    event.stopPropagation();
    event.preventDefault();
    var image = event.target.files[0];
    if (image) {
      set_disabled(true);
      dispatch(
        post.uploadImage({
          fileObject: image,
          callback: source_url => {
            imageHandler(source_url);
            set_disabled(false);
            event.target.value = null;
          },
        })
      );
    }
  };

  return (
    <>
      <input
        accept='image/*'
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
        <WallpaperOutlinedIcon className={classes.icon} />
      </IconButton>
    </>
  );
}
