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
import {
  chatDataSelector,
  chatCountSelector,
} from '../../selectors/chatSelector';
import { useSelector } from 'react-redux';
import { currentUserSelector } from '../../selectors/authSelector';
import moment from 'moment';
import { withStyles } from '@material-ui/core';
import { ActiveConversationContext } from '../../pages/chat';
import { useRouter } from 'next/router';

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

export default function ConversationsList({ subheaderPrefix }) {
  const [activeConversationId, setActiveConversationId] = React.useContext(
    ActiveConversationContext
  );
  const SubheaderPrefix = () => subheaderPrefix || <></>;
  const classes = useStyles();
  const chatData = useSelector(chatDataSelector);
  const myData = useSelector(currentUserSelector);
  const chatsCount = useSelector(chatCountSelector);

  const router = useRouter();
  const { pathname, query } = router;
  const handlegetone = conId => {
    setActiveConversationId(conId);
    router.push({ pathname, query: { ...query, conId } });
  };

  const { search } = query;

  return (
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
      {chatsCount === 0 && (
        <ListItem>
          <ListItemText secondary='No Data Found' />
        </ListItem>
      )}
      {chatData
        ?.filter(c => {
          if (search) {
            const participant = c.participants.find(p => p.id !== myData?.id);
            if (participant) {
              return participant.fullName
                .toLowerCase()
                .indexOf(search.toLowerCase()) > -1
                ? true
                : false;
            }
          }
          return true;
        })
        .map((i, x) => (
          <ListItem
            key={`chatData${x}`}
            button
            onClick={() => handlegetone(i.id)}
            disableGutters
            selected={+activeConversationId === i.id}
          >
            <ListItemAvatar>
              <ImageAvatar
                src={
                  i.participants.find(p => p.id !== myData?.id)?.profileImage
                }
              />
            </ListItemAvatar>
            <ListItemText
              primary={i.participants.find(p => p?.id !== myData?.id)?.fullName}
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
                  {i.updatedAt}
              </Typography>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
    </List>
  );
}
