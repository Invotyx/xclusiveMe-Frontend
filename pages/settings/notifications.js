import React, { useEffect } from 'react';
import Layout from '../../components/layouts/layout-settings';
import Head from 'next/head';
import { Box, Divider, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { post } from '../../actions/post/index';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { useDispatch, useSelector } from 'react-redux';
import { settingsNotify } from '../../selectors/postSelector';

const notifications = () => {
  const dispatch = useDispatch();
  const ourdata = useSelector(settingsNotify);
  let tempArr = [];

  tempArr = ourdata;

  useEffect(() => {
    console.log('our', ourdata);
  }, [ourdata]);

  useEffect(() => {
    dispatch(post.requestSettingsNotifications());
  }, []);

  const [state, setState] = React.useState({
    checkedB: true,
    like: true,
    comment: true,
    tag: true,
    subscribe: true,
    paymentSuccess: true,
    postPurchase: true,
    planUpdate: true,
  });

  function arrayRemove(arr, value) {
    console.log(arr, value, 'remove fubction');
    var tt = arr.filter(item => item !== value);
    console.log(tt, 'updated array');

    return tt;
  }

  function addValues(arr, value) {
    arr.push(value);
    return arr;
  }
  const handleChange = (check, event) => {
    console.log('check', check, event.target.checked);
    // setState({ ...state, [check]: event.target.checked });

    var updated =
      ourdata.includes(check) === false
        ? addValues(tempArr, check)
        : arrayRemove(tempArr, check);

    dispatch(
      post.addSettingNotification({
        data: {
          settings: updated,
        },

        callback: () => {
          dispatch(post.requestSettingsNotifications());
          console.log('dispatch');
          // postData.getComment({
          //   id: post.id,
          // })
        },
      })
    );
  };

  const IOSSwitch = withStyles(theme => ({
    root: {
      width: 42,
      height: 26,
      padding: 0,
      margin: theme.spacing(1),
      checkedB: true,
    },
    switchBase: {
      padding: 1,
      '&$checked': {
        transform: 'translateX(16px)',
        color: theme.palette.common.white,
        '& + $track': {
          backgroundColor: '#52d869',
          opacity: 1,
          border: 'none',
        },
      },
      '&$focusVisible $thumb': {
        color: '#52d869',
        border: '6px solid #fff',
      },
    },
    thumb: {
      width: 24,
      height: 24,
    },
    track: {
      borderRadius: 26 / 2,
      border: `1px solid ${theme.palette.grey[400]}`,
      backgroundColor: theme.palette.grey[50],
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
  }))(({ classes, ...props }) => {
    return (
      <Switch
        focusVisibleClassName={classes.focusVisible}
        disableRipple
        classes={{
          root: classes.root,
          switchBase: classes.switchBase,
          thumb: classes.thumb,
          track: classes.track,
          checked: classes.checked,
        }}
        {...props}
      />
    );
  });

  return (
    <Layout>
      <Head>
        <title>Notification — Settings</title>
      </Head>
      <Box>
        <Typography variant='h6' style={{ color: '#868686' }}>
          Other Settings
        </Typography>
      </Box>
      <Box mt={2} mb={2}>
        <Divider />
      </Box>
      <Box>
        <Typography variant='h6'>
          Notification & Notification Settings
        </Typography>
        <Typography variant='h7'>
          Enable and Disable the following notifications
        </Typography>
      </Box>
      <Box
        mb={2}
        mt={2}
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Box>
          <Box flexGrow={1}>
            <Typography variant='h6'>Likes</Typography>
            <Typography variant='h7' style={{ color: '#868686' }}>
              Notify me when someone likes my photo
            </Typography>
          </Box>
        </Box>
        <FormControlLabel
          control={
            <IOSSwitch
              checked={ourdata?.includes('like') && state.like}
              onChange={e => handleChange('like', e)}
              name='like'
            />
          }
        />
      </Box>

      <Box
        mb={2}
        mt={2}
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Box>
          <Box flexGrow={1}>
            <Typography variant='h6'>Comments</Typography>
            <Typography variant='h7' style={{ color: '#868686' }}>
              Notify me when someone comments on my photo{' '}
            </Typography>
          </Box>
        </Box>
        <FormControlLabel
          control={
            <IOSSwitch
              checked={ourdata?.includes('comment') && state.comment}
              onChange={e => handleChange('comment', e)}
              name='comment'
            />
          }
        />
      </Box>

      <Box
        mb={2}
        mt={2}
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Box>
          <Box flexGrow={1}>
            <Typography variant='h6'>Tags</Typography>
            <Typography variant='h7' style={{ color: '#868686' }}>
              Notify me when someone tags me
            </Typography>
          </Box>
        </Box>
        <FormControlLabel
          control={
            <IOSSwitch
              checked={ourdata?.includes('tag') && state.tag}
              onChange={e => handleChange('tag', e)}
              name='tag'
            />
          }
        />
      </Box>

      <Box
        mb={2}
        mt={2}
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Box>
          <Box flexGrow={1}>
            <Typography variant='h6'>Subscription Alerts</Typography>
            <Typography variant='h7' style={{ color: '#868686' }}>
              Notify me when someone subscribes to my profile
            </Typography>
          </Box>
        </Box>
        <FormControlLabel
          control={
            <IOSSwitch
              checked={ourdata?.includes('subscribe') && state.subscribe}
              onChange={e => handleChange('subscribe', e)}
              name='subscribe'
            />
          }
        />
      </Box>

      <Box
        mb={2}
        mt={2}
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Box>
          <Box flexGrow={1}>
            <Typography variant='h6'>Successful Payments</Typography>
            <Typography variant='h7' style={{ color: '#868686' }}>
              Notify me when someone makes a payment
            </Typography>
          </Box>
        </Box>
        <FormControlLabel
          control={
            <IOSSwitch
              checked={
                ourdata?.includes('paymentSuccess') && state.paymentSuccess
              }
              onChange={e => handleChange('paymentSuccess', e)}
              name='paymentSuccess'
            />
          }
        />
      </Box>

      <Box
        mb={2}
        mt={2}
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Box>
          <Box flexGrow={1}>
            <Typography variant='h6'>Paid Post notifications</Typography>
            <Typography variant='h7' style={{ color: '#868686' }}>
              Send me alerts about paid posts
            </Typography>
          </Box>
        </Box>
        <FormControlLabel
          control={
            <IOSSwitch
              checked={ourdata?.includes('postPurchase') && state.postPurchase}
              onChange={e => handleChange('postPurchase', e)}
              name='postPurchase'
            />
          }
        />
      </Box>

      <Box
        mb={2}
        mt={2}
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Box>
          <Box flexGrow={1}>
            <Typography variant='h6'>Plan Updates</Typography>
            <Typography variant='h7' style={{ color: '#868686' }}>
              Send me alerts when someone updates a plan
            </Typography>
          </Box>
        </Box>
        <FormControlLabel
          control={
            <IOSSwitch
              checked={ourdata?.includes('planUpdate') && state.planUpdate}
              onChange={e => handleChange('planUpdate', e)}
              name='planUpdate'
            />
          }
        />
      </Box>
    </Layout>
  );
};

export default notifications;
