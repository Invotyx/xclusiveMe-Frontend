import React, { useEffect, useState } from 'react';
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
import NextLink from 'next/link';
import router from 'next/router';
import { singlepostDataSelector } from '../../selectors/postSelector';
import CommentModel from '../profile/commentModel';
import ProfileImageAvatar from '../profile/profile-image-avatar';

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

export default function Notification({
  onClose,
  profileData,
  currentUser,
  altHeader,
}) {
  const classes = useStyles();
  const listofNotifications = useSelector(notificationsData);
  const notifyCount = useSelector(notificationsCount);
  const dispatch = useDispatch();
  const [isToday, setIsToday] = useState(false);
  const [count, setCount] = useState(0);
  const [oldCount, setOldCount] = useState(0);
  const [open, setOpen] = useState(false);
  const singlePost = useSelector(singlepostDataSelector);
  const [name, setName] = useState(null);
  const [userName, setUserName] = useState(null);
  const [profieImg, setProfileImage] = useState(null);

  const readNotification = (notifyId, modalId) => {
    setOpen(true);
    dispatch(post?.requestOne(modalId));
    dispatch(
      post?.viewNotifications({
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
      today.getDate();
    return date;
  }

  useEffect(() => {
    listofNotifications?.map(l => {
      // console.log('count = ', count);
      l.createdAt.substring(0, 10) == todayDate()
        ? setCount(count + 1)
        : setOldCount(oldCount + 1);
      // console.log(l.createdAt.substring(0, 10));
    });
  }, [listofNotifications]);

  // console.log('count', count, 'oldCount', oldCount);
  // console.log(todayDate());

  return (
    <>
      {/* <ListSubheader>Today</ListSubheader> */}
      {notifyCount === 0 ? (
        <p style={{ marginLeft: '20px', padding: '20px', width: '200px' }}>
          No Data Found
        </p>
      ) : (
        <div>
          {count > 0 && (
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
          )}
          <div>
            {listofNotifications?.map((i, x) => (
              <div>
                {i.createdAt.substring(0, 10) == todayDate() ? (
                  <div onClick={() => readNotification(i.id, i.modelId)}>
                    <MenuItem onClick={onClose} key={`notificationToday${x}`}>
                      <ListItemAvatar>
                        <div>
                          {i.relatedUsers[0].user.profileImage === null ? (
                            <img
                              src='./dp.png'
                              alt='image'
                              style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                              }}
                            />
                          ) : (
                            <img
                              src={i.relatedUsers[0].user.profileImage}
                              alt='image'
                              style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                              }}
                            />
                          )}
                        </div>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <span className={styles.nameStyleTwo}>
                            {i.relatedUsers[0]?.user.fullName}
                          </span>
                        }
                        secondary={
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                            }}
                          >
                            <div className={styles.dataAndTitle}>
                              {i.type === 'comment' ? (
                                <span className={styles.tag}>
                                  {' '}
                                  <img
                                    src='/noticomm.svg'
                                    alt='comment'
                                    style={{
                                      width: '20px',
                                      height: '12px',
                                      marginRight: '0px',
                                    }}
                                  />
                                  commented{' '}
                                </span>
                              ) : i.type === 'like' ? (
                                <span className={styles.tag}>❤️️Liked </span>
                              ) : (
                                <span className={styles.tag}>
                                  {' '}
                                  <img
                                    src='/purchased.svg'
                                    alt='comment'
                                    style={{
                                      width: '20px',
                                      height: '12px',
                                      marginRight: '0px',
                                    }}
                                  />
                                  Purchased{' '}
                                </span>
                              )}

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
                                    <span
                                      style={{
                                        textOverflow: 'clip',
                                        whiteSpace: 'normal',
                                        height: 'auto',
                                        width: '15vw',
                                      }}
                                      className={styles.tag}
                                    >
                                      {i.content.slice(0, 50)}
                                    </span>
                                  </>
                                ) : i.type === 'like' ? (
                                  ''
                                ) : (
                                  ''
                                )}
                              </Typography>
                            </div>
                            <div>
                              <img
                                src={i.relatedMediaLink}
                                alt='related post'
                                width='30px'
                                height='30px'
                              />
                            </div>
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
          {oldCount > 0 && (
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
          )}
          <div>
            {listofNotifications?.map((i, x) => (
              <div>
                {i.createdAt?.substring(0, 10) !== todayDate() ? (
                  <div onClick={() => readNotification(i.id, i.modelId)}>
                    <MenuItem onClick={onClose} key={`notificationToday${x}`}>
                      <ListItemAvatar>
                        {i.relatedUsers[0]?.user?.profileImage === null ? (
                          <img
                            src='./dp.png'
                            alt='image'
                            style={{
                              width: '40px',
                              height: '40px',
                              borderRadius: '50%',
                            }}
                          />
                        ) : (
                          <img
                            src={i.relatedUsers[0]?.user?.profileImage}
                            alt='image'
                            style={{
                              width: '40px',
                              height: '40px',
                              borderRadius: '50%',
                            }}
                          />
                        )}
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <span className={styles.nameStyleTwo}>
                            {i.relatedUsers[0]?.user?.fullName}
                          </span>
                        }
                        secondary={
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                            }}
                          >
                            <div className={styles.dataAndTitle}>
                              {i.type === 'comment' ? (
                                <span className={styles.tag}>
                                  <img
                                    src='/noticomm.svg'
                                    alt='comment'
                                    style={{
                                      width: '20px',
                                      height: '12px',
                                      marginRight: '0px',
                                    }}
                                  />
                                  commented{' '}
                                </span>
                              ) : i.type === 'like' ? (
                                <span className={styles.tag}>❤️️Liked </span>
                              ) : (
                                <span className={styles.tag}>
                                  {' '}
                                  <img
                                    src='/purchased.svg'
                                    alt='comment'
                                    style={{
                                      width: '20px',
                                      height: '12px',
                                      marginRight: '0px',
                                    }}
                                  />
                                  Purchased{' '}
                                </span>
                              )}

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
                                    <span
                                      style={{
                                        textOverflow: 'clip',
                                        whiteSpace: 'normal',
                                        height: 'auto',
                                        width: '15vw',
                                      }}
                                      className={styles.tag}
                                    >
                                      {i.content.slice(0, 100)}
                                    </span>
                                  </>
                                ) : i.type === 'like' ? (
                                  ''
                                ) : (
                                  ''
                                )}
                              </Typography>
                            </div>
                            {i.relatedMediaLink ? (
                              <div>
                                <img
                                  src={i.relatedMediaLink}
                                  alt='related post'
                                  width='30px'
                                  height='30px'
                                />
                              </div>
                            ) : (
                              ''
                            )}
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
          <CommentModel
            singlePost={singlePost}
            profileData={profileData}
            open={open}
            setOpen={setOpen}
            currentUser={currentUser}
            altHeader={altHeader}
          />
        </div>
      )}
    </>
  );
}
