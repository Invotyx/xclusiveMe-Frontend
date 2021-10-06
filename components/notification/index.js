import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { notificationsData } from '../../selectors/postSelector';
import { notificationsCount } from '../../selectors/postSelector';
import { post } from '../../actions/post';
import moment from 'moment';
import styles from './newPost.module.css';
import { useRouter } from 'next/router';
import CommentModal from '../profile/commentModel';
import ProfileImageAvatar from '../profile/profile-image-avatar';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ListItem } from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

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

export default function Notification({ setAnchorEl }) {
  const classes = useStyles();
  const listofNotifications = useSelector(notificationsData);
  const notifyCount = useSelector(notificationsCount);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width: 760px)');
  const chckday = ['Today', 'Older'];

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
    setAnchorEl(null);
  };

  return (
    <>
      {Boolean(notifyCount) ? (
        <List disablePadding>
          {chckday.map(elm => {
            const temp = listofNotifications?.filter(n =>
              elm === 'Today'
                ? n.createdAt.substring(0, 10) ===
                  moment().toISOString().substring(0, 10)
                : n.createdAt.substring(0, 10) !==
                  moment().toISOString().substring(0, 10)
            );
            return temp.length ? (
              <li key={Math.random()} className={classes.listSection}>
                <ul style={{ padding: 0 }}>
                  <ListSubheader>
                    <span style={{ color: 'white' }}>{elm}</span>{' '}
                  </ListSubheader>
                  {temp.map((i, x) => (
                    <ListItem
                      button
                      onClick={() =>
                        readNotification(
                          i.id,
                          i.modelId,
                          i.type,
                          i.relatedUsers[0].user
                        )
                      }
                      key={`notificationToday${x}`}
                    >
                      <ListItemAvatar>
                        <ProfileImageAvatar user={i?.relatedUsers[0]?.user} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <>
                            <span className={styles.nameStyleTwo}>
                              {i.relatedUsers[0]?.user.fullName}
                            </span>
                            {i.isRead === false && (
                              <FiberManualRecordIcon
                                style={{
                                  fontSize: '10px',
                                  marginLeft: '3px',
                                  marginBottom: '1px',
                                }}
                              />
                            )}
                          </>
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
                                  commented
                                </span>
                              ) : i.type === 'like' ? (
                                <span className={styles.tag}>❤️️Liked </span>
                              ) : i.type === 'postPurchase' ? (
                                <span className={styles.tag}>
                                  <img
                                    src='/tipicon.svg'
                                    alt='purchased'
                                    style={{
                                      width: '20px',
                                      height: '12px',
                                      marginRight: '0px',
                                    }}
                                  />
                                  Purchased
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
                                    <span
                                      style={{
                                        textOverflow: 'clip',
                                        whiteSpace: 'normal',
                                        height: 'auto',
                                        width: isMobile ? '40vw' : '15vw',
                                      }}
                                      className={styles.tago}
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
                                    className={styles.tago}
                                  >
                                    {i.content}
                                  </span>
                                ) : i.type === 'reply' ? (
                                  <>
                                    <span
                                      style={{
                                        textOverflow: 'clip',
                                        whiteSpace: 'normal',
                                        height: 'auto',
                                        width: isMobile ? '40vw' : '15vw',
                                      }}
                                      className={styles.tago}
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
                    </ListItem>
                  ))}
                </ul>
              </li>
            ) : (
              <></>
            );
          })}
        </List>
      ) : (
        <p style={{ marginLeft: '20px', padding: '20px', width: '200px' }}>
          No Data Found
        </p>
      )}
      <CommentModal open={open} setOpen={setOpen} />
    </>
  );
}
