import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { user as userAction } from '../../../actions/user';
import { useDispatch, useSelector } from 'react-redux';
import ProfileImageAvatar from '../profile-image-avatar';
import NextLink from 'next/link';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    width: '10vw',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const useStyles = makeStyles(theme => ({
  inline: {
    display: 'inline',
    cursor: 'pointer',
  },
  dialogeSystem: {
    minWidth: '10px',
  },
}));

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant='h6'>{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function Followers({
  openFollowers,
  setOpenFollowers,
  followsData,
  followcount,
  user,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  var forFollowers = followsData;
  var [followerss, setFollowers] = useState([]);
  const [followersPage, setFollowersPage] = useState(2);
  const [followLength, setFollowLength] = useState(5);

  const handleClose = () => {
    setOpenFollowers(false);
    setFollowersPage(1);
    setFollowLength(5);
    setFollowers([]);
  };

  useEffect(() => {
    setFollowers(followerss => followerss?.concat(forFollowers));
  }, [forFollowers]);

  const loadmore = () => {
    setFollowersPage(followersPage + 1);
    setFollowLength(followLength + 5);
    dispatch(
      userAction.followers({
        userId: user?.id,
        page: followersPage,
        limit: 5,
      })
    );
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={openFollowers}
        maxWidth='xs'
        fullWidth={true}
      >
        <DialogTitle id='customized-dialog-title' onClose={handleClose}>
          Followers
        </DialogTitle>
        <DialogContent dividers>
          {followcount <= 0 ? (
            <Typography
              component='span'
              variant='body2'
              className={classes.inline}
              color='textPrimary'
            >
              You have 0 Followers
            </Typography>
          ) : (
            <>
              <List>
                {followerss?.map(f => (
                  <ListItem alignItems='flex-start'>
                    <ListItemAvatar>
                      <ProfileImageAvatar user={f} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={f?.fullName}
                      secondary={
                        <React.Fragment onClick={() => handleClose()}>
                          <NextLink
                            href={`/x/${f?.username}`}
                            key={`user${f?.user}`}
                          >
                            <Typography
                              component='span'
                              variant='body2'
                              className={classes.inline}
                              color='textPrimary'
                              onClick={() => handleClose()}
                            >
                              View Profile
                            </Typography>
                          </NextLink>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                ))}
              </List>
              {followLength < followcount && (
                <p onClick={loadmore} style={{ cursor: 'pointer' }}>
                  Load more
                </p>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
