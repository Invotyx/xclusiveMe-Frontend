import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { notificationsData } from '../../selectors/postSelector';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { ListItemAvatar } from '@material-ui/core';
import ProfileImageAvatar from '../profile/profile-image-avatar';
import dynamic from "next/dynamic";
const PrimarySection = dynamic(() => import("./primary-section"), { ssr: true })
const SecondarySection = dynamic(() => import("./secondary-section"), {ssr: true})

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 600,
    backgroundColor: '#141414',
    position: 'relative',
    maxHeight: 600,
    padding: 0,
    '@media (max-height: 900px)': {
      maxHeight: 520,
    },
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
}));

export default function NotificationList() {
  const classes = useStyles();
  const listOfNotifications = useSelector(notificationsData);
  const [todayList, setTodayList] = useState([]);
  const [olderList, setOlderList] = useState([]);

  useEffect(() => {
    setTodayList([])
    setOlderList([])
    if (listOfNotifications && Object.keys(listOfNotifications).length > 0) {
      const currD = moment().format('YYYY-MM-DD');
      listOfNotifications?.map(notification => {
        if (currD === moment(notification.createdAt).format('YYYY-MM-DD')) {
          setTodayList(todayList => todayList.concat(notification));
        } else {
          setOlderList(olderList => olderList.concat(notification));
        }
      });
    }
  }, [listOfNotifications]);

  return (
    <List className={classes.root} subheader={<li />}>
      {['Today', 'Older'].map(sectionId => (
        <li key={`section-${sectionId}`} className={classes.listSection}>
          <ul className={classes.ul}>
            {sectionId === 'Today' && Object.keys(todayList).length > 0 && (
              <>
                <ListSubheader style={{ color: 'white' }}>
                  {sectionId}
                </ListSubheader>
                {todayList?.map(item => (
                  <ListItem key={`item-${sectionId}-${item}`}>
                    <ListItemAvatar>
                      <ProfileImageAvatar user={item?.relatedUsers[0]?.user} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={<PrimarySection item={item} />}
                      secondary={<SecondarySection item={item} />}
                    />
                    {item?.relatedMediaLink && (
                      <ListItemAvatar>
                        <img
                          src={item?.relatedMediaLink}
                          alt='related post'
                          width='50px'
                          height='50px'
                        />
                      </ListItemAvatar>
                    )}
                  </ListItem>
                ))}
              </>
            )}
            {sectionId === 'Older' && Object.keys(olderList).length > 0 && (
              <>
                <ListSubheader style={{ color: 'white' }}>
                  {sectionId}
                </ListSubheader>
                {olderList?.map(item => (
                  <ListItem key={`item-${sectionId}-${item}`}>
                    <ListItemAvatar>
                      <ProfileImageAvatar user={item?.relatedUsers[0]?.user} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={<PrimarySection item={item} />}
                      secondary={<SecondarySection item={item} />}
                    />
                    {item?.relatedMediaLink && (
                      <ListItemAvatar>
                        <img
                          src={item?.relatedMediaLink}
                          alt='related post'
                          width='50px'
                          height='50px'
                        />
                      </ListItemAvatar>
                    )}
                  </ListItem>
                ))}
              </>
            )}
          </ul>
        </li>
      ))}
    </List>
  );
}
