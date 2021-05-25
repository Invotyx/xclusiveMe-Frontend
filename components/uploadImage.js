import React from 'react';
import { useDispatch } from 'react-redux';
import { post } from '../actions/post';
import WallpaperOutlinedIcon from '@material-ui/icons/WallpaperOutlined';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: '#666',
  },
}));

export default function FormDialog({
  children,
  imageHandler,
  set_Loading,
  set_disabled,
}) {
  const dispatch = useDispatch();
  const inputFile = React.useRef(null);
  const [img, setImg] = React.useState(null);
  const classes = useStyles();

  const onChangeFile = (event) => {
    event.stopPropagation();
    event.preventDefault();
    set_disabled(true);
    var image = event.target.files[0];
    set_Loading(true);
    dispatch(
      post.uploadImage({
        fileObject: image,
        callback: (source_url) => {
          if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
              setImg(e.target.result);
              imageHandler(e.target.result, image, source_url);
            };
            reader.readAsDataURL(event.target.files[0]);
          }
          set_Loading(false);
          set_disabled(false);
        },
      })
    );
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
