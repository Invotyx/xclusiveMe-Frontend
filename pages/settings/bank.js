import React from 'react';
import { motion } from 'framer-motion';
import { variants } from '../../services/framer-variants';
import Head from 'next/head';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Layout from '../../components/layouts/layout-settings';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemIcon from '@mui/material/ListItemIcon';
import BankAddDialog from '../../components/settings/bank/add-dialog';
import PaymentIcon from '@mui/icons-material/Payment';
import CircularProgress from '@mui/material/CircularProgress';
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
