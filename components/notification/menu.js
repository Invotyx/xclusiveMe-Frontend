import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Menu from '@mui/material/Menu';

const useStyles = makeStyles(() => ({
  root: {
    width: 'auto',
    marginLeft: '-170px',
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
        horizontal: 'middle',
      }}
      className={classes.root}
    >
      {children}
    </Menu>
  );
}
