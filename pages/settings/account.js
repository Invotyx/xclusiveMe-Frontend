import React from 'react';
import { useDispatch } from 'react-redux';
import Head from 'next/head';
import Image from 'next/image';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import InputAdornment from '@material-ui/core/InputAdornment';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import UppercaseInputLabel from '../components/UppercaseInputLabel';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import LogoAuth from '../components/logo-auth';
import { makeStyles } from '@material-ui/core/styles';
import TileTextField from '../components/TileTextField';
import SidebarSettings from '../components/SidebarSettings';
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';
import { auth } from '../../actions/auth';

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
  const dispatch = useDispatch();
  const [editLinkedAccount, set_editLinkedAccount] = React.useState(null);
  const [editLinkedAccountText, set_editLinkedAccountText] = React.useState(
    null
  );
  const [username, set_username] = React.useState('vdotdl');
  const [email, set_email] = React.useState('vdotdl@gmail.com');
  const [phone, set_phone] = React.useState('+1 222 884 5655');
  const [password, set_password] = React.useState('');
  const [verificationViaSms, set_verificationViaSms] = React.useState(false);
  const [authenticatorApp, set_authenticatorApp] = React.useState(true);

  const classes = useStyles();
  const handleUpdate = () => {
    dispatch(auth.updateProfile({ username, email, phoneNumber: phone }));
  };
  const handleUpdatePassword = () => {
    dispatch(auth.updateProfile({ password }));
  };
  const handleLogOutAllSessions = () => {
    // dispatch(auth.logoutAll({}));
  };
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
                onChange={(e) => set_username(e.target.value)}
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
                onChange={(e) => set_email(e.target.value)}
                variant='outlined'
                margin='normal'
                fullWidth
                name='email'
                label='Email'
                type='email'
              />
              <TileTextField
                value={phone}
                onChange={(e) => set_phone(e.target.value)}
                variant='outlined'
                margin='normal'
                fullWidth
                name='phone'
                label='Phone'
                type='phone'
              />
              <Button variant='outlined' onClick={handleUpdate}>
                Update
              </Button>
            </Box>
            <Box mb={4}>
              <UppercaseInputLabel>Linked Accounts</UppercaseInputLabel>
              <List>
                {linkedAccounts.map((i, j) => (
                  <Box mb={1} key={`linkedAccounts${j}`}>
                    <ListItem selected={true}>
                      {i.icon && <ListItemIcon>{i.icon}</ListItemIcon>}
                      <ListItemText
                        primary={i.text}
                        secondary={
                          <>
                            {editLinkedAccount === i.text ? (
                              <Box display='flex' mt={1}>
                                <Box mr={1}>
                                  <TileTextField
                                    value={editLinkedAccountText}
                                    onChange={(e) =>
                                      set_editLinkedAccountText(e.target.value)
                                    }
                                    variant='outlined'
                                    size='small'
                                    name='phone'
                                    type='phone'
                                  />
                                </Box>
                                <Box>
                                  <Button
                                    variant='outlined'
                                    onClick={() => {
                                      linkedAccounts[
                                        linkedAccounts.indexOf(i)
                                      ].active = editLinkedAccountText;
                                      set_editLinkedAccount(null);
                                    }}
                                  >
                                    save
                                  </Button>
                                </Box>
                              </Box>
                            ) : (
                              i.active
                            )}
                          </>
                        }
                      />
                      <ListItemSecondaryAction>
                        {editLinkedAccount !== i.text && (
                          <IconButton
                            onClick={() => {
                              set_editLinkedAccount(i.text);
                              set_editLinkedAccountText(i.active);
                            }}
                          >
                            {i.active ? <ClearIcon /> : <AddIcon />}
                          </IconButton>
                        )}
                      </ListItemSecondaryAction>
                    </ListItem>
                  </Box>
                ))}
              </List>
            </Box>
            <Box mb={4}>
              <TileTextField
                placeholder='•••••••'
                value={password}
                onChange={(e) => set_password(e.target.value)}
                variant='outlined'
                margin='normal'
                fullWidth
                name='password'
                label='Password'
                type='password'
              />
              <Button variant='outlined' onClick={handleUpdatePassword}>
                Update Password
              </Button>
            </Box>
            <Box mb={4}>
              <UppercaseInputLabel>Two Step Authentication</UppercaseInputLabel>
              <List>
                {loginSessions.map((i, j) => (
                  <React.Fragment key={`loginSessions${j}`}>
                    <ListItem selected={true}>
                      <ListItemText
                        primary={i.userAgent}
                        secondary={`${i.ip} • ${i.country}`}
                      />
                      <ListItemSecondaryAction>
                        {i.time}
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
              <Button variant='outlined' onClick={handleLogOutAllSessions}>
                Log out all sessions
              </Button>
            </Box>
            <Box mb={4}>
              <UppercaseInputLabel>Login Sessions</UppercaseInputLabel>
              <List>
                <ListItem disableGutters>
                  <ListItemText
                    primary={`Authenticator App`}
                    secondary={`You can use Microsoft or Google Authenticator application for iOS or Android`}
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge='end'
                      onChange={(e) => {
                        set_authenticatorApp(e.target.checked);
                      }}
                      checked={authenticatorApp}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem disableGutters>
                  <ListItemText primary={`Verification via SMS`} />
                  <ListItemSecondaryAction>
                    <Switch
                      edge='end'
                      onChange={(e) => {
                        set_verificationViaSms(e.target.checked);
                      }}
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
