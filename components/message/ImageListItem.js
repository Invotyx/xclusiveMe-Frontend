import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => ({
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  children: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#00000080',
  },
}));

export default function ImageListItem({ src, children, ...rest }) {
  const classes = useStyles();

  return (
    <Box position='relative' marginRight={1} {...rest}>
      <Avatar variant='square' src={src} className={classes.avatar} />
      <Box className={classes.children}>{children}</Box>
    </Box>
  );
}
