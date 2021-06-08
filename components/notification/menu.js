import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    maxWidth: '46ch',
  },
}));

export default function NotificationMenu({
  anchorEl,
  onClose,
  open,
  children,
}) {
  const classes = useStyles();

  return (
    <Menu
      id='simple-menu'
      anchorEl={anchorEl}
      open={open}
      keepMounted
      onClose={onClose}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      className={classes.root}
    >
      {children}
    </Menu>
  );
}
