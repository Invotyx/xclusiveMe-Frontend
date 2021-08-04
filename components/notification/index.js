import React, { useState } from 'react';
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
import moment from 'moment';
import styles from './newPost.module.css';

const useStyles = makeStyles(theme => ({
  small: {
    width: '40px',
    height: '40px',
    marginRight: 10,
  },
  inline: {
    display: 'flex',
    marginLeft: '8px',
    fontWeight: '900',
    fontSize: '12px',
    fontFamily: 'Poppins',
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
  const [isToday, setIsToday] = useState(false);

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

  function todayDate() {
    var today = new Date();
    var date =
      today.getFullYear() +
      '-' +
      '0' +
      (today.getMonth() + 1) +
      '-' +
      '0' +
      today.getDate();
    return date;
  }

  return (
    <>
      {/* <ListSubheader>Today</ListSubheader> */}
      {notifyCount === 0 ? (
        <p style={{ marginLeft: '20px', padding: '20px', width: '200px' }}>
          No Data Found
        </p>
      ) : (
        <div>
          <p
            style={{
              marginLeft: '20px',
              fontWeight: '500',
              fontSize: '14px',
              fontStyle: 'normal',
            }}
          >
            Today
          </p>
          <div>
            {listofNotifications?.map((i, x) => (
              <div>
                {i.createdAt.substring(0, 10) == todayDate() ? (
                  <div onClick={() => readNotification(i.id)}>
                    <MenuItem onClick={onClose} key={`notificationToday${x}`}>
                      <ListItemAvatar>
                        <Avatar
                          alt='Cindy Baker'
                          src={i.relatedUserProfileImage}
                          className={classes.small}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <span className={styles.nameStyle}>
                            {i.relatedUsersNames[0]}
                          </span>
                        }
                        secondary={
                          <div className={styles.dataAndTitle}>
                            <span className={styles.timeStyle}>
                              {moment(i.createdAt).fromNow()}
                            </span>
                            <Typography
                              component='span'
                              variant='body2'
                              className={classes.inline}
                              color='textPrimary'
                            >
                              {i.type === 'comment' ? (
                                <>
                                  {' '}
                                  <img src='/noticomm.svg' alt='comment' />{' '}
                                  {i.title}
                                </>
                              ) : i.type === 'like' ? (
                                <>
                                  {' '}
                                  <img src='/notilike.svg' alt='comment' />{' '}
                                  {i.title}
                                </>
                              ) : (
                                <>{i.title}</>
                              )}
                            </Typography>
                          </div>
                        }
                      />
                      {/* <ListItemSecondaryAction>
                        <Avatar
                          alt='Cindy Baker'
                          src={i.image}
                          variant='square'
                        />
                      </ListItemSecondaryAction> */}
                    </MenuItem>
                  </div>
                ) : (
                  ''
                )}
              </div>
            ))}
          </div>
          <p
            style={{
              marginLeft: '20px',
              fontWeight: '500',
              fontSize: '14px',
              fontStyle: 'normal',
            }}
          >
            Older
          </p>
          <div>
            {listofNotifications?.map((i, x) => (
              <div>
                {i.createdAt.substring(0, 10) !== todayDate() ? (
                  <div onClick={() => readNotification(i.id)}>
                    <MenuItem onClick={onClose} key={`notificationToday${x}`}>
                      <ListItemAvatar>
                        <Avatar
                          alt='Cindy Baker'
                          src={i.relatedUserProfileImage}
                          className={classes.small}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <span className={styles.nameStyle}>
                            {i.relatedUsersNames[0]}
                          </span>
                        }
                        secondary={
                          <div className={styles.dataAndTitle}>
                            <span className={styles.timeStyle}>
                              {moment(i.createdAt).fromNow()}
                            </span>
                            <Typography
                              component='p'
                              variant='body2'
                              className={classes.inline}
                              color='textPrimary'
                            >
                              {i.type === 'comment' ? (
                                <>
                                  {' '}
                                  <img src='/noticomm.svg' alt='comment' />{' '}
                                  {i.title}
                                </>
                              ) : i.type === 'like' ? (
                                <>
                                  {' '}
                                  <img src='/notilike.svg' alt='comment' />{' '}
                                  {i.title}
                                </>
                              ) : (
                                <>{i.title}</>
                              )}
                            </Typography>
                          </div>
                        }
                      />
                      {/* <ListItemSecondaryAction>
                        <Avatar
                          alt='Cindy Baker'
                          src={i.image}
                          variant='square'
                        />
                      </ListItemSecondaryAction> */}
                    </MenuItem>
                  </div>
                ) : (
                  ''
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
