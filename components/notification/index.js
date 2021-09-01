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
import router, { useRouter } from 'next/router';
import { singlepostDataSelector } from '../../selectors/postSelector';
import CommentModel from '../profile/commentModel';
import ProfileImageAvatar from '../profile/profile-image-avatar';
import { useMediaQuery } from 'react-responsive';

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
  const router = useRouter();
  const isMobile = useMediaQuery({ query: '(max-width: 760px)' });

  const readNotification = (notifyId, modalId, type, user) => {
    type === 'like' || type === 'comment' || type === 'post' || type === 'reply'
      ? (setOpen(true), dispatch(post?.requestOne(modalId)))
      : type === 'subscribe' || type === 'postPurchase'
      ? router.push(`/x/${user?.username}`)
      : console.log('ok');

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
      '0' +
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
          <div
            className={styles.makeScroll}
            style={{ maxHeight: count > 0 && oldCount === 0 ? '55vh' : '35vh' }}
          >
            {listofNotifications?.map((i, x) => (
              <div>
                {i.createdAt.substring(0, 10) == todayDate() ? (
                  <div
                    onClick={() =>
                      readNotification(
                        i.id,
                        i.modelId,
                        i.type,
                        i.relatedUsers[0].user
                      )
                    }
                  >
                    <MenuItem onClick={onClose} key={`notificationToday${x}`}>
                      <ListItemAvatar>
                        <ProfileImageAvatar user={i?.relatedUsers[0]?.user} />
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
                              ) : i.type === 'postPurchase' ? (
                                <span className={styles.tag}>
                                  {' '}
                                  <img
                                    src='/tipicon.svg'
                                    alt='purchased'
                                    style={{
                                      width: '20px',
                                      height: '12px',
                                      marginRight: '0px',
                                    }}
                                  />
                                  Purchased{' '}
                                </span>
                              ) : i.type === 'planUpdate' ? (
                                <span className={styles.tag}>Updated Plan</span>
                              ) : i.type === 'subscribe' ? (
                                <span className={styles.tag}>Followed you</span>
                              ) : i.type === 'reply' ? (
                                <span className={styles.tag}>Replied</span>
                              ) : (
                                ''
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
                                        width: isMobile ? '40vw' : '15vw',
                                      }}
                                      className={styles.tag}
                                    >
                                      {i.content.slice(0, 50)}
                                    </span>
                                  </>
                                ) : i.type === 'postPurchase' ? (
                                  <span
                                    style={{
                                      textOverflow: 'clip',
                                      whiteSpace: 'normal',
                                      height: 'auto',
                                      width: isMobile ? '40vw' : '15vw',
                                    }}
                                    className={styles.tag}
                                  >
                                    {i.content}
                                  </span>
                                ) : i.type === 'reply' ? (
                                  <>
                                    {' '}
                                    <span
                                      style={{
                                        textOverflow: 'clip',
                                        whiteSpace: 'normal',
                                        height: 'auto',
                                        width: isMobile ? '40vw' : '15vw',
                                      }}
                                      className={styles.tag}
                                    >
                                      {i.content.slice(0, 50)}
                                    </span>
                                  </>
                                ) : (
                                  ''
                                )}
                              </Typography>
                            </div>
                            {i.relatedMediaLink && (
                              <div>
                                <img
                                  src={i.relatedMediaLink}
                                  alt='related post'
                                  width='30px'
                                  height='30px'
                                />
                              </div>
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
          <div
            className={styles.makeScroll}
            style={{ maxHeight: oldCount > 0 && count === 0 ? '55vh' : '30vh' }}
          >
            {listofNotifications?.map((i, x) => (
              <div>
                {i.createdAt?.substring(0, 10) !== todayDate() ? (
                  <div
                    onClick={() =>
                      readNotification(
                        i.id,
                        i.modelId,
                        i.type,
                        i.relatedUsers[0].user
                      )
                    }
                  >
                    <MenuItem onClick={onClose} key={`notificationToday${x}`}>
                      <ListItemAvatar>
                        <ProfileImageAvatar user={i.relatedUsers[0]?.user} />
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
                              ) : i.type === 'postPurchase' ? (
                                <span className={styles.tag}>
                                  {' '}
                                  <img
                                    src='/tipicon.svg'
                                    alt='comment'
                                    style={{
                                      width: isMobile ? '10px' : '20px',
                                      height: '12px',
                                      marginRight: '0px',
                                    }}
                                  />
                                  Purchased{' '}
                                </span>
                              ) : i.type === 'planUpdate' ? (
                                <span className={styles.tag}>Updated Plan</span>
                              ) : i.type === 'subscribe' ? (
                                <span className={styles.tag}>Followed you</span>
                              ) : i.type === 'reply' ? (
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
                                  Replied
                                </span>
                              ) : (
                                ''
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
                                        width: isMobile ? '40vw' : '15vw',
                                      }}
                                      className={styles.tag}
                                    >
                                      {i.content.slice(0, 100)}
                                    </span>
                                  </>
                                ) : i.type === 'postPurchase' ? (
                                  <span
                                    style={{
                                      textOverflow: 'clip',
                                      whiteSpace: 'normal',
                                      height: 'auto',
                                      width: isMobile ? '40vw' : '15vw',
                                    }}
                                    className={styles.tag}
                                  >
                                    {i.content}
                                  </span>
                                ) : i.type === 'reply' ? (
                                  <>
                                    {' '}
                                    <span
                                      style={{
                                        textOverflow: 'clip',
                                        whiteSpace: 'normal',
                                        height: 'auto',
                                        width: isMobile ? '40vw' : '15vw',
                                      }}
                                      className={styles.tag}
                                    >
                                      {i.content.slice(0, 50)}
                                    </span>
                                  </>
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
