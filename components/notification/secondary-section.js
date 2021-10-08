import { makeStyles, Typography } from '@material-ui/core';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import styles from './newPost.module.css';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles(theme => ({
  small: {
    width: '40px',
    height: '40px',
    marginRight: 10,
  },
  inline: {
    display: 'flex',
    marginLeft: '8px',
    fontWeight: '300',
    fontSize: '12px',
    fontFamily: 'Poppins',
  },
}));

const SecondarySection = ({ item }) => {
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width: 760px)');
  const [notificationData, setNotificationData] = useState({
    img: '',
    text: '',
  });

  useEffect(() => {
    if (item) {
      if (item.type === 'comment') {
        setNotificationData({
          img: '/noticomm.svg',
          text: `Commented ${moment(item.createdAt).fromNow()}`,
        });
      } else if (item.type === 'like') {
        setNotificationData({
          img: '/hearticon.svg',
          text: `Liked ${moment(item.createdAt).fromNow()}`,
        });
      } else if (item.type === 'postPurchase') {
        setNotificationData({
          img: '/tipicon.svg',
          text: `Purchased ${moment(item.createdAt).fromNow()}`,
        });
      } else if (item.type === 'planUpdate') {
        setNotificationData({
          img: null,
          text: `Updated Plan ${moment(item.createdAt).fromNow()}`,
        });
      } else if (item.type === 'subscribe') {
        setNotificationData({
          img: null,
          text: `Followed you ${moment(item.createdAt).fromNow()}`,
        });
      } else if (item.type === 'reply') {
        setNotificationData({
          img: null,
          text: `Replied ${moment(item.createdAt).fromNow()}`,
        });
      }
    }
  }, [item]);
  return (
    <>
      <div style={{ display: 'flex' }}>
        <p className={styles.tag} style={{marginTop: "0px"}}>
          {notificationData.img && (
            <img
              src={notificationData.img}
              style={{
                width: '20px',
                height: '12px',
                marginRight: '0px',
              }}
            />
          )}
          {` ${notificationData.text} — `}
          <a style={{ color: 'white' }}>{item.content.slice(0, 50)}</a>
        </p>
      </div>
    </>
  );
};

export default SecondarySection;
