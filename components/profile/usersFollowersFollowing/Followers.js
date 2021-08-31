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
import { Box, CircularProgress } from '@material-ui/core';
import { ListItemSecondaryAction } from '@material-ui/core';
import { getImage } from '../../../services/getImage';
import { fetchingSelector } from '../../../selectors/userSelector';

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
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
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
  const [closeThis, setCloseThis] = useState(false);
  const fetchData = useSelector(fetchingSelector);

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

  const handleClose = () => {
    setFollowers([]);
    setOpenFollowers(false);
    setFollowersPage(2);
    setFollowLength(5);
    setCloseThis(true);
  };

  useEffect(() => {
    closeThis && setFollowers([]);
  }, []);

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={openFollowers}
        maxWidth='sm'
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
                {followerss?.map(
                  f =>
                    f?.username && (
                      <NextLink href={`/x/${f.username}`} key={`user${f.id}`}>
                        <Box
                          clone
                          pt={3}
                          pb={3}
                          mb={4}
                          height={100}
                          style={{
                            backgroundSize: 'cover',
                            backgroundImage: f.coverImage
                              ? `url(${getImage(f.coverImage)})`
                              : `url('/cover.jpg')`,
                            boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.5)',
                          }}
                          onClick={() => handleClose()}
                        >
                          <ListItem>
                            <Box clone mr={2}>
                              <ListItemAvatar>
                                <ProfileImageAvatar
                                  className={classes.large}
                                  user={f}
                                />
                              </ListItemAvatar>
                            </Box>
                            <ListItemText primary={f.username} />
                            <ListItemSecondaryAction
                              onClick={() => handleClose()}
                            >
                              <NextLink
                                href={`/x/${f.username}`}
                                key={`user${f.id}`}
                              >
                                <Button size='small' variant='outlined'>
                                  view profile
                                </Button>
                              </NextLink>
                            </ListItemSecondaryAction>
                          </ListItem>
                        </Box>
                      </NextLink>
                    )
                )}
              </List>
              {fetchData && <CircularProgress />}
              {followLength < followcount && (
                <p
                  onClick={loadmore}
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
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
