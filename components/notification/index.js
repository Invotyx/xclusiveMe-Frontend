import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '46ch',
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    marginRight: 10,
  },
  inline: {
    display: 'inline',
  },
}));

const notificationToday = [
  {
    avatar: 'https://material-ui.com/static/images/avatar/3.jpg',
    title: 'Ariana Green',
    image: 'https://material-ui.com/static/images/avatar/3.jpg',
    secondary1: 'commented two hours ago',
    secondary2: ' - This is beautiful one of my favourite',
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
    secondary2: ' - This is beautiful one of my favourite',
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

export default function Notification() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const settingsMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <List
        className={classes.root}
        subheader={<ListSubheader>Today</ListSubheader>}
      >
        {notificationToday.map((i, x) => (
          <ListItem
            onClick={settingsMenuClose}
            key={`notificationToday${x}`}
            alignItems='flex-start'
          >
            <ListItemAvatar>
              <Avatar
                alt='Cindy Baker'
                src={i.avatar}
                className={classes.small}
              />
            </ListItemAvatar>
            <ListItemText
              primary={i.title}
              secondary={
                <React.Fragment>
                  {i.secondary1}
                  <Typography
                    component='span'
                    variant='body2'
                    className={classes.inline}
                    color='textPrimary'
                  >
                    {i.secondary2}
                  </Typography>
                </React.Fragment>
              }
            />
            <ListItemSecondaryAction>
              <Avatar alt='Cindy Baker' src={i.image} variant='square' />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <List
        component='nav'
        aria-labelledby='nested-list-subheader'
        className={classes.root}
        subheader={
          <ListSubheader component='div' id='nested-list-subheader'>
            Yesterday
          </ListSubheader>
        }
      >
        {notificationYesterday.map((i, x) => (
          <ListItem
            onClick={settingsMenuClose}
            key={`notificationYesterday${x}`}
            alignItems='flex-start'
          >
            <ListItemAvatar>
              <Avatar
                alt='Cindy Baker'
                src={i.avatar}
                className={classes.small}
              />
            </ListItemAvatar>
            <ListItemText
              primary={i.title}
              secondary={
                <React.Fragment>
                  {i.secondary1}
                  <Typography
                    component='span'
                    variant='body2'
                    className={classes.inline}
                    color='textPrimary'
                  >
                    {i.secondary2}
                  </Typography>
                </React.Fragment>
              }
            />
            <ListItemSecondaryAction>
              <Avatar alt='Cindy Baker' src={i.image} variant='square' />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </>
  );
}
