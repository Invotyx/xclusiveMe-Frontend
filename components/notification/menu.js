import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import style from "./newPost.module.css"

const useStyles = makeStyles(() => ({
  root: {
    width: 'auto',
    marginLeft: '-170px',
    marginTop: "25px"
  },
  paper: {
    width: "500px"
  }
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
      classes={{paper: classes.paper}}
      className={style.notificationMenu}
    >
      {children}
    </Menu>
  );
}
