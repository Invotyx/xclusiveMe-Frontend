import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles(() => ({
  root: {
    width: 'auto',
    marginLeft: '70vw',
    marginTop: '-44vh',
  },
}));

export default function MessageMenu({ messageEl, onClose, open, children }) {
  const classes = useStyles();

  return (
    <Menu
      id='simple-menu'
      messageEl={messageEl}
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
