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
import { followingSelector } from '../../../selectors/userSelector';
import { followingCountSelector } from '../../../selectors/userSelector';
import { useSelector } from 'react-redux';
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

export default function Followings({ openFollowing, setOpenFollowing }) {
  const classes = useStyles();

  const followsData = useSelector(followingSelector);
  const count = useSelector(followingCountSelector);
  var forFollowers = followsData;
  var [followerss, setFollowers] = useState([]);
  const [followersPage, setFollowersPage] = useState(2);
  const [followLength, setFollowLength] = useState(5);

  const handleClose = () => {
    setOpenFollowing(false);
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
        open={openFollowing}
        maxWidth='xs'
        fullWidth={true}
      >
        <DialogTitle id='customized-dialog-title' onClose={handleClose}>
          Followings
        </DialogTitle>
        <DialogContent dividers>
          {count <= 0 ? (
            <Typography
              component='span'
              variant='body2'
              className={classes.inline}
              color='textPrimary'
            >
              You have 0 following
            </Typography>
          ) : (
            <>
              <List>
                {followerss?.map(f => (
                  <ListItem alignItems='flex-start'>
                    <ListItemAvatar>
                      <ProfileImageAvatar user={f?.creator} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={f?.creator?.fullName}
                      secondary={
                        <React.Fragment onClick={() => handleClose()}>
                          <NextLink
                            href={`/x/${f?.creator?.username}`}
                            key={`user${f?.creator?.id}`}
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
              {followLength < count && (
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
