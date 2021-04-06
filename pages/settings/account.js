import { useRouter } from 'next/router';
import React from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import InputAdornment from '@material-ui/core/InputAdornment';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import LogoAuth from '../components/logo-auth';
import { makeStyles } from '@material-ui/core/styles';
import TileTextField from '../components/TileTextField';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '150px',
  },
}));

const sidebarNavItems = [
  { url: '#', text: 'Edit Profile' },
  { url: '/settings/account', text: 'Account' },
  { url: '#', text: 'Privacy' },
  { url: '#', text: 'Subscriptions' },
  { url: '#', text: 'Notifications' },
];

export default function Home(props) {
  const username = 'vdotdl';
  const email = 'vdotdl@gmail.com';
  const phone = '+1 222 884 5655';
  const { asPath } = useRouter();

  const classes = useStyles();
  return (
    <Container maxWidth='md'>
      <Head>
        <title>xclusiveme</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
        <link rel='icon' href='/favicon.ico' />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
        />
      </Head>
      <LogoAuth />
      <Grid container spacing={2} className={classes.root}>
        <Grid item xs={12} md={4}>
          <List>
            {sidebarNavItems.map((i, j) => (
              <NextLink href={i.url} key={j}>
                <ListItem selected={i.url === asPath}>
                  <ListItemText primary={i.text} />
                </ListItem>
              </NextLink>
            ))}
          </List>
        </Grid>
        <Grid item xs={12} md={5}>
          <form noValidate>
            <TileTextField
              value={username}
              variant='outlined'
              margin='normal'
              fullWidth
              label='Account Info'
              name='username'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>@</InputAdornment>
                ),
              }}
            />
            <TileTextField
              value={email}
              variant='outlined'
              margin='normal'
              fullWidth
              name='email'
              label='Email'
              type='email'
            />
            <TileTextField
              value={phone}
              variant='outlined'
              margin='normal'
              fullWidth
              name='phone'
              label='Phone'
              type='phone'
            />
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}
