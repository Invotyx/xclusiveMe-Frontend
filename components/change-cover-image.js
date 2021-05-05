import React from 'react';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import { useDispatch } from 'react-redux';
import { auth } from '../actions/auth';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { currentUserSelector } from '../selectors/authSelector';
import getConfig from 'next/config';
import { getImage } from '../services/getImage';
const { publicRuntimeConfig } = getConfig();
const SERVER_ADDRESS = publicRuntimeConfig.backendUrl;

const useStyles = makeStyles((theme) => ({
  media: {
    zIndex: 1,
    height: 0,
    paddingTop: '33%',
    marginTop: '-72px',
    // position: 'relative',
    '&::after': {
      // content: '" "',
      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      backgroundColor: 'rgba(0,0,0,0.7)',
    },
  },
}));

export default function FormDialog({ children }) {
  const userSelector = useSelector(currentUserSelector);
  const classes = useStyles();
  const dispatch = useDispatch();
  const inputFile = React.useRef(null);

  const onChangeFile = (event) => {
    event.stopPropagation();
    event.preventDefault();
    var image = event.target.files[0];
    dispatch(
      auth.uploadCover({
        fileObject: image,
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

      <CardActionArea
        onClick={(event) => {
          event.stopPropagation();
          event.preventDefault();
          return inputFile.current.click();
        }}
      >
        {children}
        <CardMedia
          className={classes.media}
          image={
            userSelector && userSelector.coverImage
              ? getImage(userSelector.coverImage)
              : '/cover.jpg'
          }
          title='Paella dish'
        />
      </CardActionArea>
    </>
  );
}
