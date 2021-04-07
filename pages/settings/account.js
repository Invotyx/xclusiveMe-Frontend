import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import InputAdornment from '@material-ui/core/InputAdornment';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import LogoAuth from '../components/logo-auth';
import { makeStyles } from '@material-ui/core/styles';
import TileTextField from '../components/TileTextField';
import SidebarSettings from '../components/SidebarSettings';
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '150px',
  },
}));

const linkedAccounts = [
  {
    url: '#',
    text: 'Twitter',
    active: 'vdotl@gmail.com',
    icon: <Image width={20} height={20} src='/twitter.svg' />,
  },
  {
    url: '#',
    text: 'Google',
    active: '',
    icon: <Image width={20} height={20} src='/google.svg' />,
  },
  {
    url: '#',
    text: 'Xclusive',
    active: '',
    icon: <Image width={20} height={20} src='/logo.svg' />,
  },
];

const loginSessions = [
  {
    userAgent: 'Chrome 88.0, Windows 10',
    ip: '222.187.25.187',
    country: 'United States',
    time: 'Active Now',
  },
  {
    userAgent: 'Chrome 88.0, Windows 10',
    ip: '222.187.25.187',
    country: 'United States',
    time: '15m ago',
  },
];

export default function Home(props) {
  const username = 'vdotdl';
  const email = 'vdotdl@gmail.com';
  const phone = '+1 222 884 5655';
  const verificationViaSms = false;
  const authenticatorApp = true;

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
      <Grid container spacing={6} className={classes.root}>
        <Grid item xs={12} md={4}>
          <SidebarSettings />
        </Grid>
        <Grid item xs={12} md={5}>
          <form noValidate>
            <Box mb={4}>
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
            </Box>
            <Box mb={4}>
              <InputLabel>Linked Accounts</InputLabel>
              <List>
                {linkedAccounts.map((i, j) => (
                  <Box mb={1} key={`linkedAccounts${j}`}>
                    <ListItem selected={true}>
                      {i.icon && <ListItemIcon>{i.icon}</ListItemIcon>}
                      <ListItemText primary={i.text} secondary={i.active} />
                      <ListItemSecondaryAction>
                        {i.active ? <ClearIcon /> : <AddIcon />}
                      </ListItemSecondaryAction>
                    </ListItem>
                  </Box>
                ))}
              </List>
            </Box>
            <Box mb={4}>
              <TileTextField
                value={`password`}
                variant='outlined'
                margin='normal'
                fullWidth
                name='password'
                label='Password'
                type='password'
              />
              <Button variant='outlined'>Update Password</Button>
            </Box>
            <Box mb={4}>
              <InputLabel>Two Step Authentication</InputLabel>
              <List>
                {loginSessions.map((i, j) => (
                  <>
                    <ListItem selected={true} key={`loginSessions${j}`}>
                      <ListItemText
                        primary={i.userAgent}
                        secondary={`${i.ip} • ${i.country}`}
                      />
                      <ListItemSecondaryAction>
                        {i.time}
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider key={`loginSessionsDivider${j}`} />
                  </>
                ))}
              </List>
              <Button variant='outlined'>Log out all sessions</Button>
            </Box>
            <Box mb={4}>
              <InputLabel>Login Sessions</InputLabel>
              <List>
                <ListItem disableGutters>
                  <ListItemText
                    primary={`Authenticator App`}
                    secondary={`You can use Microsoft or Google Authenticator application for iOS or Android`}
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge='end'
                      onChange={(e) => console.log(e)}
                      checked={authenticatorApp}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem disableGutters>
                  <ListItemText primary={`Verification via SMS`} />
                  <ListItemSecondaryAction>
                    <Switch
                      edge='end'
                      onChange={(e) => console.log(e)}
                      checked={verificationViaSms}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </Box>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}
