import React from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import LogoAuth from './components/logo-auth';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '150px',
  },
}));

const sidebarNavItems = [
  { url: '#', text: 'Edit Profile' },
  { url: '#', text: 'Account' },
  { url: '#', text: 'Privacy' },
  { url: '#', text: 'Subscriptions' },
  { url: '#', text: 'Notifications' },
];

export default function Home() {
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
                <ListItem>
                  <ListItemText primary={i.text} />
                </ListItem>
              </NextLink>
            ))}
          </List>
        </Grid>
      </Grid>
    </Container>
  );
}
