import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import style from "./newPost.module.css"

const useStyles = makeStyles(() => ({
  paper: {
    width: '500px',
    marginLeft: '-180px',
    '&::-webkit-scrollbar': {
      width: '0.3em',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 5px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 5px rgba(0,0,0,0.00)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'white',
      outline: '1px solid grey',
    },
    "@media (max-height: 900px)": {
      marginTop:"0px"
    }
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
      classes={{paper: classes.paper}}
    >
      {children}
    </Menu>
  );
}
