import React, { useEffect } from 'react';
import Alert from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { variants } from '../../services/framer-variants';
import Head from 'next/head';
import BillingAddDialog from '../../components/settings/billing/add-dialog';
import Box from '@material-ui/core/Box';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import PaymentIcon from '@material-ui/icons/Payment';
import CheckIcon from '@material-ui/icons/Check';
import {
  paymentMethodDataSelector,
  fetchingSelector,
} from '../../selectors/paymentMethodSelector';
import { paymentMethod } from '../../actions/payment-method';
import Layout from '../../components/layouts/layout-settings';

const useStyles = makeStyles(theme => ({
  root: {
    // marginTop: '150px',
  },
  defaultLabel: {
    display: 'inline-block',
    padding: '0 16px',
    fontSize: '0.7rem',
    '& > .MuiAlert-icon': {
      display: 'none',
    },
  },
}));

export default function Home(props) {
  const classes = useStyles();
  const paymentData = useSelector(paymentMethodDataSelector);
  const fetching = useSelector(fetchingSelector);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [planId, setPlanId] = React.useState(null);
  const handleClickListItem = (event, pid) => {
    setAnchorEl(event.currentTarget);
    setPlanId(pid);
  };

  const handleEdit = () => {
    dispatch(
      paymentMethod.setDefault(planId, () => dispatch(paymentMethod.request()))
    );
  };

  const handleDelete = () => {
    window.confirm('Do you want proceed?') &&
      dispatch(
        paymentMethod.delete(planId, () => dispatch(paymentMethod.request()))
      );
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    dispatch(paymentMethod.request());
  }, [dispatch]);

  return (
    <Layout>
      <Head>
        <title>Billing — Settings</title>
      </Head>
      <Box display='flex' mb={2}>
        <Box flexGrow={1}>
          <Typography variant='h6'>Billing methods</Typography>
        </Box>
        <BillingAddDialog />
      </Box>
      <Box mb={2}>
        <Divider />
      </Box>
      <div>{fetching ? <CircularProgress /> : ``}</div>
      <List>
        {paymentData.length ? (
          paymentData.map(p => (
            <ListItem
              key={p.id}
              button
              onClick={e => handleClickListItem(e, p.id)}
            >
              <ListItemIcon>
                <PaymentIcon />
              </ListItemIcon>
              <ListItemText
                primary={`${p.title} (${p.type})`}
                secondary={`Ending in ••${p.last4_card}`}
              />
              <ListItemSecondaryAction>
                {p.default ? (
                  <Alert
                    severity='info'
                    className={classes.defaultLabel}
                    icon={<></>}
                  >
                    Default
                  </Alert>
                ) : (
                  <></>
                )}
              </ListItemSecondaryAction>
            </ListItem>
          ))
        ) : (
          <Box mb={2}>
            <Typography variant='subtitle2'>
              You have not set up any billing methods yet.
            </Typography>
            <Typography variant='body2'>
              Your billing method will be charged only when blah blah blah sint
              occaecat cupidatat proident suntculpa officia deserunt mollit anim
              laborum
            </Typography>
          </Box>
        )}
      </List>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleEdit}>Set Default</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </Layout>
  );
}
