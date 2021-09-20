import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { variants } from '../../services/framer-variants';
import Head from 'next/head';
import Grid from '@mui/material/Grid';
import Layout from '../../components/layouts/layout-settings';
import Popover from '../../components/settings/subscription/popover';
import SubscriptionForm from '../../components/settings/subscription/SubscriptionForm';

export default function Home() {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <motion.div initial='hidden' animate='visible' variants={variants}>
      <Layout>
        <Head>
          <title>Account — Settings</title>
        </Head>
        <Grid container spacing={6}>
          <Grid item xs={12} md={8}>
            <SubscriptionForm />
          </Grid>
        </Grid>
        <Popover open={open} setOpen={setOpen} />
      </Layout>
    </motion.div>
  );
}
