import React from 'react';
import { motion } from 'framer-motion';
import { variants } from '../../services/framer-variants';
import Head from 'next/head';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Layout from '../../components/layouts/layout-settings';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import BankAddDialog from '../../components/settings/bank/add-dialog';
import PaymentIcon from '@material-ui/icons/Payment';
import CircularProgress from '@material-ui/core/CircularProgress';
import { fetchingSelector } from '../../selectors/postSelector';
import { useSelector } from 'react-redux';

export default function Home() {
  const bankData = [];
  const fetchData = useSelector(fetchingSelector);

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
                <Typography variant='h6'>Linked Bank Accounts</Typography>
              </Box>
              <BankAddDialog />
            </Box>
            <Box mb={2}>
              <Divider />
            </Box>
            {fetchData && <CircularProgress />}
            <Box mb={2}>
              {bankData.length ? (
                <>
                      <Box mb={2}>
                        <Typography variant='subtitle2'>
                          <strong>Your Linked Bank Account</strong>
                        </Typography>
                        <Typography variant='subtitle2'>
                          You may not be able to change your bank details
                        </Typography>
                      </Box>
                  <List>
                    {bankData.map(p => (
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
                          {p.default && (
                            <Avatar className={classes.green}>
                              <CheckIcon />
                            </Avatar>
                          )}
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </>
              ) : (
                  <Box mb={2}>
                    <Typography variant='subtitle2'>
                      You have no bank account linked to this profile. To add a
                      subscription fee to your content, please add a bank.
                    </Typography>
                  </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Layout>
    </motion.div>
  );
}
