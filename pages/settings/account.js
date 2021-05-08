import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { variants } from '../../services/framer-variants';
import Head from 'next/head';
import Image from 'next/image';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import UppercaseInputLabel from '../../components/UppercaseInputLabel';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { makeStyles } from '@material-ui/core/styles';
import TileTextField from '../../components/TileTextField';
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkIcon from '@material-ui/icons/Link';
import { auth } from '../../actions/auth';
import {
  currentUserSelector,
  currentUserSessionsSelector,
} from '../../selectors/authSelector';
import { useSelector } from 'react-redux';
import Layout from '../../components/layout-settings';
import { fetchingSelector } from '../../selectors/authSelector';
import { errorSelector } from '../../selectors/authSelector';

const useStyles = makeStyles((theme) => ({
  root: {
    // marginTop: '150px',
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
    text: 'Facebook',
    active: '',
    icon: <FacebookIcon />,
  },
  {
    url: '#',
    text: 'Website',
    active: '',
    icon: <LinkIcon />,
  },
];

export default function Home(props) {
  const fetching = useSelector(fetchingSelector);
  const error = useSelector(errorSelector);
  const dispatch = useDispatch();
  const [editLinkedAccount, set_editLinkedAccount] = React.useState(null);
  const [editLinkedAccountText, set_editLinkedAccountText] = React.useState(
    null
  );
  const [username, set_username] = React.useState('');
  const [email, set_email] = React.useState('');
  const [phone, set_phone] = React.useState('');
  const [password, set_password] = React.useState('');
  const [password_old, set_password_old] = React.useState('');
  const [verificationViaSms, set_verificationViaSms] = React.useState(false);
  const [authenticatorApp, set_authenticatorApp] = React.useState(true);
  const [validationErrors, setValidationErrors] = React.useState({});
  const currentUser = useSelector(currentUserSelector);
  const loginSessions = useSelector(currentUserSessionsSelector);

  useEffect(() => {
    if (currentUser) {
      set_username(currentUser.username);
      set_email(currentUser.email);
      set_phone(currentUser.phoneNumber);
      set_verificationViaSms(currentUser.fa2);
    }
  }, [currentUser]);
  useEffect(() => {
    dispatch(auth.getSessions());
  }, []);

  useEffect(() => {
    if (error?.response?.data?.errors) {
      setValidationErrors(Object.assign(...error.response.data.errors));
    } else {
      setValidationErrors({});
    }
  }, [error]);

  const classes = useStyles();
  const handleUpdate = (event) => {
    event.preventDefault();
    dispatch(
      auth.updateProfile({
        username,
        email,
        phoneNumber: phone,
      })
    );
  };
  const handleUpdatePassword = (event) => {
    event.preventDefault();
    dispatch(
      auth.updateProfile({
        password,
        oldPassword: password_old,
      })
    );
  };
  const handleLogOutAllSessions = () => {
    dispatch(auth.expireAllSessions());
  };
  return (
    <motion.div initial='hidden' animate='visible' variants={variants}>
      <Layout>
        <Head>
          <title>Account — Settings</title>
        </Head>
        <Grid container spacing={6} className={classes.root}>
          <Grid item xs={12} md={8}>
            <form onSubmit={handleUpdate}>
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
                  error={validationErrors && validationErrors.username}
                  helperText={
                    validationErrors.username
                      ? Object.values(validationErrors.username).join(', ')
                      : ''
                  }
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
                  error={validationErrors && validationErrors.email}
                  helperText={
                    validationErrors.email
                      ? Object.values(validationErrors.email).join(', ')
                      : ''
                  }
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
                  error={validationErrors && validationErrors.phoneNumber}
                  helperText={
                    validationErrors.phoneNumber
                      ? Object.values(validationErrors.phoneNumber).join(', ')
                      : ''
                  }
                />
                <Button variant='outlined' type='submit' disabled={fetching}>
                  Update
                </Button>
              </Box>
            </form>
            <form noValidate>
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
                                        set_editLinkedAccountText(
                                          e.target.value
                                        )
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
            </form>
            <form onSubmit={handleUpdatePassword}>
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
                {password && (
                  <TileTextField
                    value={password_old}
                    onChange={(e) => set_password_old(e.target.value)}
                    variant='outlined'
                    margin='normal'
                    fullWidth
                    name='password_old'
                    label='Old Password'
                    type='password'
                  />
                )}
                <Button variant='outlined' type='submit' disabled={fetching}>
                  Update Password
                </Button>
              </Box>
            </form>
            <form noValidate>
              <Box mb={4}>
                <UppercaseInputLabel>Login Sessions</UppercaseInputLabel>
                <List>
                  {loginSessions.length === 0 && <div>no sessions</div>}
                  {loginSessions.map((i, j) => (
                    <React.Fragment key={`loginSessions${j}`}>
                      <ListItem selected={true}>
                        <ListItemText
                          primary={i.browser}
                          secondary={`${i.publicIp}`}
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
            </form>
            <form noValidate>
              <Box mb={4}>
                <UppercaseInputLabel>
                  Two Step Authentication
                </UppercaseInputLabel>
                <List>
                  {false && (
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
                  )}
                  <ListItem disableGutters>
                    <ListItemText primary={`Verification via SMS`} />
                    <ListItemSecondaryAction>
                      <Switch
                        edge='end'
                        onChange={(e) => {
                          set_verificationViaSms(e.target.checked);
                          dispatch(
                            auth.updateTwoFactorAuthentication({
                              fa2: e.target.checked,
                            })
                          );
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
        {alert && <BottomAlert error={error} />}
      </Layout>
    </motion.div>
  );
}
