import React from 'react';
import ProfileImageAvatar from './profile-image-avatar';
import NextLink from 'next/link';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { Box } from '@material-ui/core';
import { getImage } from '../../services/getImage';
import { ListItemSecondaryAction, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    // marginTop: '150px',
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const UserListComponent = ({ u, setOpenFollowers }) => {
  const classes = useStyles();
  return (
    <NextLink href={`/x/${u.username}`} key={`user${u.id}`}>
      <Box
        clone
        pt={3}
        pb={3}
        mb={4}
        height={100}
        style={{
          backgroundSize: 'cover',
          backgroundImage: u.coverImage
            ? `url(${getImage(u.coverImage)})`
            : `url('/no-media.jpg')`,
          boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.5)',
        }}
        onClick={() => setOpenFollowers(false)}
      >
        <ListItem>
          <Box clone mr={2}>
            <ListItemAvatar>
              <ProfileImageAvatar className={classes.large} user={u} />
            </ListItemAvatar>
          </Box>
          <ListItemText primary={u.username} />
          <ListItemSecondaryAction onClick={() => setOpenFollowers(false)}>
            <NextLink href={`/x/${u.username}`} key={`user${u.id}`}>
              <Button size='small' variant='outlined'>
                view profile
              </Button>
            </NextLink>
          </ListItemSecondaryAction>
        </ListItem>
      </Box>
    </NextLink>
  );
};

export default UserListComponent;
