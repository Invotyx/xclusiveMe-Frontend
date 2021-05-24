import React from 'react';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { currentUserSelector } from '../selectors/authSelector';
import { getImage } from '../services/getImage';

const useStyles = makeStyles(() => ({
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

  return (
    <>
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
    </>
  );
}
