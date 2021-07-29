import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { notificationsData } from '../../selectors/postSelector';
import { notificationsCount } from '../../selectors/postSelector';
import { post } from '../../actions/post';

const useStyles = makeStyles(theme => ({
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    marginRight: 10,
  },
  inline: {
    display: 'flex',
  },
}));

const notificationToday = [
  {
    avatar: 'https://material-ui.com/static/images/avatar/3.jpg',
    title: 'Ariana Green',
    image: 'https://material-ui.com/static/images/avatar/3.jpg',
    secondary1: 'commented two hours ago',
    secondary2: ' This is beautiful one of my favourite',
  },
  {
    avatar: 'https://material-ui.com/static/images/avatar/3.jpg',
    title: 'Ariana Green',
    image: 'https://material-ui.com/static/images/avatar/3.jpg',
    secondary1: 'liked 2h ago',
    secondary2: '',
  },
  {
    avatar: 'https://material-ui.com/static/images/avatar/3.jpg',
    title: 'Ariana Green',
    image: 'https://material-ui.com/static/images/avatar/3.jpg',
    secondary1: 'liked 2h ago',
    secondary2: '',
  },
  {
    avatar: 'https://material-ui.com/static/images/avatar/3.jpg',
    title: 'Ariana Green',
    image: 'https://material-ui.com/static/images/avatar/3.jpg',
    secondary1: 'tipped 2h ago',
    secondary2: '',
  },
];

const notificationYesterday = [
  {
    avatar: 'https://material-ui.com/static/images/avatar/3.jpg',
    title: 'Ariana Green',
    image: 'https://material-ui.com/static/images/avatar/3.jpg',
    secondary1: 'commented two hours ago',
    secondary2: ' This is beautiful one of my favourite',
  },
  {
    avatar: 'https://material-ui.com/static/images/avatar/3.jpg',
    title: 'Ariana Green',
    image: 'https://material-ui.com/static/images/avatar/3.jpg',
    secondary1: 'liked 2h ago',
    secondary2: '',
  },
  {
    avatar: 'https://material-ui.com/static/images/avatar/3.jpg',
    title: 'Holly Molly',
    image: 'https://material-ui.com/static/images/avatar/3.jpg',
    secondary1: 'liked 2h ago',
    secondary2: '',
  },
];

export default function Notification({ onClose }) {
  const classes = useStyles();
  const listofNotifications = useSelector(notificationsData);
  const notifyCount = useSelector(notificationsCount);
  const dispatch = useDispatch();

  const readNotification = notifyId => {
    dispatch(
      post.viewNotifications({
        id: notifyId,
        isNotify: {
          isRead: true,
        },
      })
    );
  };

  return (
    <>
      {/* <ListSubheader>Today</ListSubheader> */}
      {notifyCount === 0 ? (
        <p style={{ marginLeft: '20px', padding: '20px', width: '200px' }}>
          No Data Found
        </p>
      ) : (
        <div>
          <p style={{ marginLeft: '20px' }}>All Notifications</p>
          {listofNotifications?.map((i, x) => (
            <div onClick={() => readNotification(i.id)}>
              <MenuItem onClick={onClose} key={`notificationToday${x}`}>
                <ListItemAvatar>
                  <Avatar
                    alt='Cindy Baker'
                    src={i.avatar}
                    className={classes.small}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={i.relatedUsersNames[0]}
                  secondary={
                    <React.Fragment>
                      {i.createdAt}
                      <Typography
                        component='span'
                        variant='body2'
                        className={classes.inline}
                        color='textPrimary'
                      >
                        {i.title}
                      </Typography>
                    </React.Fragment>
                  }
                />
                {/* <ListItemSecondaryAction>
            <Avatar alt='Cindy Baker' src={i.image} variant='square' />
          </ListItemSecondaryAction> */}
              </MenuItem>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
