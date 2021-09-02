import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { variants } from '../../services/framer-variants';
import Head from 'next/head';
import Image from 'next/image';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
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
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkIcon from '@material-ui/icons/Link';
import { auth } from '../../actions/auth';
import {
  currentUserSelector,
  currentUserSessionsSelector,
} from '../../selectors/authSelector';
import { useSelector } from 'react-redux';
import Layout from '../../components/layouts/layout-settings';
import { fetchingSelector } from '../../selectors/authSelector';
import { errorSelector } from '../../selectors/authSelector';
import { isValidHttpUrl } from '../../services/helper';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as parser from 'ua-parser-js';

const useStyles = makeStyles(theme => ({
  root: {
    // marginTop: '150px',
  },
}));

const linkedAccounts = [
  {
    url: '@',
    title: 'Twitter',
    icon: <Image width={20} height={20} src='/twitter.svg' />,
  },
  {
    url: '@',
    title: 'Google',
    icon: <Image width={20} height={20} src='/google.svg' />,
  },
  {
    url: '@',
    title: 'Facebook',
    icon: <FacebookIcon />,
  },
  {
    url: 'https://',
    title: 'Website',
    icon: <LinkIcon />,
  },
];

export default function Home(props) {
  const fetching = useSelector(fetchingSelector);
  const error = useSelector(errorSelector);
  const dispatch = useDispatch();
  const [editLinkedAccount, set_editLinkedAccount] = React.useState(null);
  const [editLinkedAccountUrl, set_editLinkedAccountUrl] = React.useState(null);
  const [username, set_username] = React.useState('');
  const [email, set_email] = React.useState('');
  const [phone, set_phone] = React.useState('');
  const [password, set_password] = React.useState('');
  const [password_old, set_password_old] = React.useState('');
  const [verificationViaSms, set_verificationViaSms] = React.useState(false);
  const [authenticatorApp, set_authenticatorApp] = React.useState(true);
  const [links, setLinks] = React.useState(null);
  const [validationErrors, setValidationErrors] = React.useState({});
  const currentUser = useSelector(currentUserSelector);
  const loginSessions = useSelector(currentUserSessionsSelector);

  useEffect(() => {
    if (currentUser) {
      set_username(currentUser.username);
      set_email(currentUser.email);
      set_phone(currentUser.phoneNumber);
      set_verificationViaSms(currentUser.fa2);
      setLinks(currentUser.profile.links || linkedAccounts);
    }
  }, [currentUser]);
  useEffect(() => {
    dispatch(auth.getSessions());
  }, []);

  useEffect(() => {
    if (error?.response?.data?.errors) {
      setValidationErrors(error.response.data.errors);
    } else {
      setValidationErrors({});
    }
  }, [error]);

  const classes = useStyles();
  const handleUpdate = event => {
    event.preventDefault();
    dispatch(
      auth.updateProfile({
        saveData: {
          username,
          email,
          phoneNumber: phone,
        },
      })
    );
  };
  const handleUpdatePassword = event => {
    event.preventDefault();
    dispatch(
      auth.updatePassword({
        saveData: {
          password,
          // confirmPassword: password_old,
        },
      })
    );
  };
  const handleLogOutAllSessions = () => {
    dispatch(auth.expireAllSessions());
  };
  const saveLinks = (e, link) => {
    e.preventDefault();
    // if (!isValidHttpUrl(editLinkedAccountUrl)) {
    //   setValidationErrors({ links: { invalidUrl: 'Url is invalid' } });
    //   return;
    // }
    let linkx = links.slice();
    linkx[linkx.indexOf(link)].url = editLinkedAccountUrl;
    linkx = links.map(l => Object.assign({}, l, { icon: undefined }));
    dispatch(
      auth.updateProfile({
        saveData: {
          links: linkx,
        },
        callback: () => {
          set_editLinkedAccount(null);
        },
      })
    );
  };
  return (
    <motion.div initial='hidden' animate='visible' variants={variants}>
      <Layout>
        {fetching && <CircularProgress />}
        <Head>
          <title>Account — Settings</title>
        </Head>

        <Grid container spacing={6} className={classes.root}>
          <Grid item xs={12} md={8}>
            <form onSubmit={handleUpdate}>
              <Box mb={4}>
                <TileTextField
                  value={username}
                  onChange={e => set_username(e.target.value)}
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
                  onChange={e => set_email(e.target.value)}
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
                  onChange={e => set_phone(e.target.value)}
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
                  {links?.map((i, j) => (
                    <Box mb={1} key={`linkedAccounts${j}`}>
                      <ListItem selected={true}>
                        {i.icon && <ListItemIcon>{i.icon}</ListItemIcon>}
                        <ListItemText
                          primary={i.title}
                          secondary={
                            <Typography component='div'>
                              {editLinkedAccount === i.title ? (
                                <Box display='flex' mt={1}>
                                  <Box mr={1}>
                                    <TileTextField
                                      value={editLinkedAccountUrl}
                                      onChange={e =>
                                        set_editLinkedAccountUrl(e.target.value)
                                      }
                                      variant='outlined'
                                      size='small'
                                      name='phone'
                                      type='phone'
                                      error={
                                        validationErrors &&
                                        validationErrors.links
                                      }
                                      helperText={
                                        validationErrors.links
                                          ? Object.values(
                                              validationErrors.links
                                            ).join(', ')
                                          : ''
                                      }
                                    />
                                  </Box>
                                  <Box>
                                    <Button
                                      variant='outlined'
                                      disabled={fetching}
                                      onClick={e => saveLinks(e, i)}
                                    >
                                      save
                                    </Button>
                                  </Box>
                                </Box>
                              ) : (
                                i.url
                              )}
                            </Typography>
                          }
                        />
                        <ListItemSecondaryAction>
                          {editLinkedAccount !== i.title && (
                            <IconButton
                              onClick={() => {
                                set_editLinkedAccount(i.title);
                                set_editLinkedAccountUrl(i.url);
                              }}
                            >
                              {i.url ? <EditIcon /> : <AddIcon />}
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
                  onChange={e => set_password(e.target.value)}
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  error={validationErrors && validationErrors.password}
                  helperText={
                    validationErrors.password
                      ? Object.values(validationErrors.password).join(', ')
                      : ''
                  }
                />
                {/*
                <TileTextField
                  value={password_old}
                  onChange={e => set_password_old(e.target.value)}
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  name='password_old'
                  label='Old Password'
                  type='password'
                  error={'Please Check Your Old Password'}
                  helperText={
                    validationErrors.oldPassword
                      ? Object.values(validationErrors.oldPassword).join(', ')
                      : ''
                  }
                /> */}

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
                  {loginSessions.map((i, j) => {
                    const ua = parser(i.browser);
                    return (
                      <React.Fragment key={`loginSessions${j}`}>
                        <ListItem selected={true} divider>
                          <ListItemText
                            primary={`${ua.browser.name} | ${ua.os.name} (${ua.os.version})`}
                            secondary={`${i.publicIp}`}
                          />
                          <ListItemSecondaryAction>
                            {i.time}
                          </ListItemSecondaryAction>
                        </ListItem>
                      </React.Fragment>
                    );
                  })}
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
                          onChange={e => {
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
                        onChange={e => {
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
      </Layout>
    </motion.div>
  );
}
