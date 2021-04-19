import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import PaymentIcon from '@material-ui/icons/Payment';
import CheckIcon from '@material-ui/icons/Check';
import {
  paymentDataSelector,
  fetchingSelector,
} from '../../selectors/paymentSelector';
import { payment } from '../../actions/payment';
import Layout from '../../components/layout-settings';

const useStyles = makeStyles((theme) => ({
  root: {
    // marginTop: '150px',
  },
}));

export default function Home(props) {
  const classes = useStyles();
  const paymentData = useSelector(paymentDataSelector);
  const fetching = useSelector(fetchingSelector);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [planId, setPlanId] = React.useState(null);
  const handleClickListItem = (event, pid) => {
    setAnchorEl(event.currentTarget);
    setPlanId(pid);
  };

  const handleEdit = () => {
    dispatch(payment.setDefault(planId));
  };

  const handleDelete = () => {
    window.confirm('Do you want proceed?') && dispatch(payment.delete(planId));
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    dispatch(payment.request());
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
      <List>
        {fetching ? (
          'loading'
        ) : paymentData.length ? (
          paymentData.map((p) => (
            <ListItem
              key={p.id}
              button
              onClick={(e) => handleClickListItem(e, p.id)}
            >
              <ListItemIcon>
                <PaymentIcon />
              </ListItemIcon>
              <ListItemText
                primary={`${p.title} (${p.type})`}
                secondary={`Ending in ••${p.last4_card}`}
              />
              <ListItemSecondaryAction>
                {p.default && (
                  <Avatar className={classes.green}>
                    <CheckIcon />
                  </Avatar>
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
