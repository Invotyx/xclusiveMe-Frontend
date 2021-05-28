import React from 'react';
import { motion } from 'framer-motion';
import { variants } from '../../services/framer-variants';
import Head from 'next/head';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { useSelector } from 'react-redux';
import Layout from '../../components/layouts/layout-settings';
import {
  paymentMethodDataSelector,
} from '../../selectors/paymentMethodSelector';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import BillingAddDialog from '../../components/settings/billing/add-dialog';
import PaymentIcon from '@material-ui/icons/Payment';

export default function Home() {
  const paymentData = useSelector(paymentMethodDataSelector);

  return (
    <motion.div initial='hidden' animate='visible' variants={variants}>
      <Layout>
        <Head>
          <title>Account — Settings</title>
        </Head>
        <Grid container spacing={6}>
          <Grid item xs={12} md={8}>
            <Box display='flex' mb={2}>
              <Box flexGrow={1}>
                <Typography variant='h6'>Add Details</Typography>
              </Box>
              <BillingAddDialog />
            </Box>
            <Divider />

            <Box mb={2}>
              <List>
                  'loading'
                ) : paymentData.length ? (
                  paymentData.map((p) => (
                    <>
                      <Box mb={2}>
                        <Typography variant='subtitle2'>
                          <strong>Your Linked Bank Account</strong>
                        </Typography>
                        <Typography variant='subtitle2'>
                          You may not be able to change your bank details
                        </Typography>
                      </Box>
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
                    </>
                  ))
                ) : (
                  <Box mb={2}>
                    <Typography variant='subtitle2'>
                      You have no bank account linked to this profile. To add a
                      subscription fee to your content, please add a bank.
                    </Typography>
                  </Box>
                )}
              </List>
            </Box>
          </Grid>
        </Grid>
      </Layout>
    </motion.div>
  );
}
