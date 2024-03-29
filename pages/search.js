import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { variants } from '../services/framer-variants';
import Head from 'next/head';
import NextLink from 'next/link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import SearchIcon from '@material-ui/icons/Search';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../components/layouts/layout-auth';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchingSelector,
  searchedSelector,
  userDataSelector,
} from '../selectors/userSelector';
import { user } from '../actions/user';
import {
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import { getImage } from '../services/getImage';
import ProfileImageAvatar from '../components/profile/profile-image-avatar';
import { useRouter } from 'next/router';

const useStyles = makeStyles(theme => ({
  root: {
    // marginTop: '150px',
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export default function Home() {
  const dispatch = useDispatch();
  const fetching = useSelector(fetchingSelector);
  const searched = useSelector(searchedSelector);
  const users = useSelector(userDataSelector);
  const classes = useStyles();
  const [_search, set_search] = useState('');
  const router = useRouter();
  const { pathname, query } = router;
  const handleSearch = event => {
    event.preventDefault();
    doSearch(_search);
  };
  const doSearch = q => {
    dispatch(user.search({ q }));
    router.push({ pathname, query: { ...query, q } });
  };
  useEffect(() => {
    dispatch(user.emptySearchList());
  }, []);

  return (
    <motion.div initial='hidden' animate='visible' variants={variants}>
      <Layout>
        <Head>
          <title>Search</title>
        </Head>
        <Container maxWidth='sm'>
          <Grid container className={classes.root}>
            <Grid item xs={12}>
              <form onSubmit={handleSearch}>
                <Box display='flex' mb={4}>
                  <OutlinedInput
                    autoFocus
                    fullWidth
                    placeholder='Search Username…'
                    startAdornment={<SearchIcon />}
                    value={_search}
                    onChange={e => {
                      doSearch(e.target.value);
                      set_search(e.target.value);
                    }}
                    inputProps={{
                      style: {
                        fontFamily: 'Poppins',
                        fontWeight: 'bold',
                        marginLeft: '5px',
                      },
                    }}
                  />
                </Box>
              </form>
            </Grid>
            <Grid item xs={12}>
              {fetching ? (
                <CircularProgress />
              ) : users?.length === 0 && searched ? (
                <span style={{ fontSize: '16px', fontWeight: 500 }}>
                  {' '}
                  No user found
                </span>
              ) : !searched ? (
                <span style={{ fontSize: '16px', fontWeight: 500 }}>
                  Type something to start
                </span>
              ) : (
                ''
              )}
              <List>
                {users &&
                  users?.length > 0 &&
                  users?.map(u => (
                    <NextLink href={`/x/${u.username}`} key={`user${u.id}`}>
                      <Box clone pt={3} pb={3} mb={4} height={100}>
                        <ListItem
                          style={{
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundImage: u.coverImage
                              ? `url(${getImage(u.coverImage)})`
                              : `url('/cover2.jpg')`,
                            boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.5)',
                          }}
                        >
                          <Box clone mr={2}>
                            <ListItemAvatar>
                              <ProfileImageAvatar
                                className={classes.large}
                                user={u}
                              />
                            </ListItemAvatar>
                          </Box>
                          <ListItemText primary={u.username} />
                          <ListItemSecondaryAction>
                            <NextLink
                              href={`/x/${u.username}`}
                              key={`user${u.id}`}
                            >
                              <Button size='small' variant='outlined'>
                                <span> view profile</span>
                              </Button>
                            </NextLink>
                          </ListItemSecondaryAction>
                        </ListItem>
                      </Box>
                    </NextLink>
                  ))}
              </List>
            </Grid>
          </Grid>
        </Container>
      </Layout>
    </motion.div>
  );
}
