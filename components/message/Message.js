import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import MuiListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import ImageAvatar from '../image-avatar';
import NextLink from 'next/link';
import {
  chatDataSelector,
  chatCountSelector,
} from '../../selectors/chatSelector';
import { useSelector } from 'react-redux';
import { currentUserSelector } from '../../selectors/authSelector';
import moment from 'moment';
import queryString from 'query-string';
import { withStyles } from '@material-ui/core';
import { ActiveConversationContext } from '../../pages/chat';

const ListItem = withStyles({
  root: {
    fontFamily: 'Poppins',
    '& .MuiListItemAvatar-root': {
      minWidth: `50px`,
    },
    '& .MuiListItemText-root': {
      '& .MuiListItemText-primary': {
        width: '18ch',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
      '& .MuiTypography-body1': {
        fontFamily: 'Poppins',
        fontSize: '0.8rem',
      },
    },
    '& .MuiListItemText-secondary': {
      '& .MuiTypography-body2': {
        fontFamily: 'Poppins',
        fontSize: '0.7rem',
      },
    },
    '& + .MuiListItemSecondaryAction-root': {
      '& .MuiTypography-caption': {
        fontFamily: 'Poppins',
        fontSize: '0.6rem',
      },
    },
  },
})(MuiListItem);

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: '20px',
    cursor: 'pointer',
  },
  list: {
    overflowY: 'scroll',
    overflowX: 'hidden',
    height: `calc(100vh - 208px)`,
    [theme.breakpoints.up('md')]: {
      height: `calc(100vh - 192px)`,
      minHeight: `356px`,
    },
  },
}));

export default function Message({ subheaderPrefix }) {
  const [activeConversationId, setActiveConversationId] = React.useContext(
    ActiveConversationContext
  );
  const SubheaderPrefix = () => subheaderPrefix || <></>;
  const classes = useStyles();
  const chatData = useSelector(chatDataSelector);
  const myData = useSelector(currentUserSelector);
  const chatsCount = useSelector(chatCountSelector);

  const Link = ({ passQueryString, href, children, ...otherProps }) => (
    <NextLink
      href={`${href}?${queryString.stringify(passQueryString)}`}
      {...otherProps}
    >
      {children}
    </NextLink>
  );

  const handlegetone = conId => {
    setActiveConversationId(conId);
  };

  return (
    <>
      {chatsCount === 0 ? (
        <p style={{ marginLeft: '20px', padding: '20px', width: '200px' }}>
          No Data Found
        </p>
      ) : (
        <List className={classes.list} disablePadding>
          <ListSubheader
            disableGutters
            style={{ backgroundColor: '#000', paddingTop: '8px' }}
          >
            <>
              <SubheaderPrefix />
              <Typography>All messages</Typography>
            </>
          </ListSubheader>
          {chatData?.map((i, x) => (
            <Link
              key={Math.random()}
              passHref
              href='/chat'
              passQueryString={{
                conId: `${i?.id}`,
              }}
            >
              <ListItem
                button
                onClick={() => handlegetone(i.id)}
                disableGutters
                selected={activeConversationId === i.id}
              >
                <ListItemAvatar>
                  <ImageAvatar />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    i.participants.filter(p => p?.id !== myData?.id)[0].fullName
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        component='span'
                        variant='body2'
                        style={{ color: '#757575' }}
                      >
                        {i.lastMessage.content.slice(0, 15)}...
                      </Typography>
                    </React.Fragment>
                  }
                />

                <ListItemSecondaryAction>
                  <Typography component='span' variant='caption'>
                    {moment(i.createdAt).fromNow()}
                  </Typography>
                </ListItemSecondaryAction>
              </ListItem>
            </Link>
          ))}
        </List>
      )}
    </>
  );
}
