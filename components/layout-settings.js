import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import SidebarSettings from './SidebarSettings';
import Layout from './layout-auth';

export default function LayoutSettings(props) {
  const { children, ...other } = props;
  return (
    <Layout {...other}>
      <Container maxWidth='md'>
        <Grid container spacing={6}>
          <Grid item xs={12} md={4}>
            <SidebarSettings />
          </Grid>
          <Grid item xs={12} md={8}>
            {children}
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}
