import React, { useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import { errorSelector } from '../selectors/authSelector';
import { useSelector } from 'react-redux';

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
  const error = useSelector(errorSelector);
  const [errorMessage, setErrorMessage] = React.useState('');
  useEffect(() => {
    if (error?.response?.data?.errors) {
      setErrorMessage('SomeThing Went Wrong');
    }
  }, [error]);
  return (
    <>
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar className={classes.alert}>
          {errorMessage ? (
            <>
              <IconButton>
                <CancelOutlinedIcon
                  color='primary'
                  fontSize='small'
                  className={classes.grow1}
                />
              </IconButton>
              <Typography className={classes.message}>
                {errorMessage}
              </Typography>
            </>
          ) : (
            <>
              <IconButton>
                <CheckCircleOutlineIcon
                  color='primary'
                  fontSize='small'
                  className={classes.grow}
                />
              </IconButton>
              <Typography className={classes.message}>
                Profile Updated Successfully
              </Typography>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}
