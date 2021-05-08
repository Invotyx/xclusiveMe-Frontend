import React, { useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import { useSelector, useDispatch } from 'react-redux';
import {
  severitySelector,
  openSelector,
  bottomAlertMessageSelector,
} from '../selectors/bottomAlertSelector';
import { bottomalert } from '../actions/bottom-alert';

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: 'auto',
    bottom: 0,
    height: 50,
    backgroundColor: '#333',
    justifyContent: 'center',
  },
  alert: {
    justifyContent: 'center',
    height: 20,
    alignItems: 'center',
    // marginTop: -10,
  },
  message: {
    color: 'white',
    fontSize: 14,
  },
  grow: {
    color: '#05D912',
  },
  grow1: {
    color: 'red',
  },
}));

export default function BottomAlert() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const severity = useSelector(severitySelector);
  const open = useSelector(openSelector);
  const message = useSelector(bottomAlertMessageSelector);

  useEffect(() => {
    dispatch(bottomalert.update({ open, message, severity }));
  }, [open]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(bottomalert.update({ open: false }));
    }, 6000);
  }, [open]);

  return (
    <>
      {open && (
        <AppBar position='fixed' className={classes.appBar}>
          {severity === 'error' ? (
            <Toolbar className={classes.alert}>
              <IconButton>
                <CancelOutlinedIcon
                  color='primary'
                  fontSize='small'
                  className={classes.grow1}
                />
              </IconButton>
              <Typography className={classes.message}>{message}</Typography>
            </Toolbar>
          ) : (
            <Toolbar className={classes.alert}>
              <IconButton>
                <CheckCircleOutlineIcon
                  color='primary'
                  fontSize='small'
                  className={classes.grow}
                />
              </IconButton>
              <Typography className={classes.message}>{message}</Typography>
            </Toolbar>
          )}
        </AppBar>
      )}
    </>
  );
}
