import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { variants } from '../services/framer-variants';
import Head from 'next/head';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Layout from '../components/layouts/layout-auth';
import NewPostForm from '../components/new-post/new-post-form';

export default function Home() {
  const router = useRouter();

  return (
    <motion.div initial='hidden' animate='visible' variants={variants}>
      <Layout>
        <Head>
          <title>New post</title>
        </Head>
        <Container maxWidth='sm'>
          <Grid container>
            <Grid item xs={12}>
              <NewPostForm afterSave={() => router.push('/explore')} />
            </Grid>
          </Grid>
        </Container>
      </Layout>
    </motion.div>
  );
}
