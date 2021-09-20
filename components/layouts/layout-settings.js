import React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import SidebarSettings from './SidebarSettings';
import Layout from './layout-auth';

export default function LayoutSettings({ children }) {
  const [sidebarMenu, set_sidebarMenu] = React.useState(true);
  return (
    <Layout sidebarMenu={sidebarMenu} set_sidebarMenu={set_sidebarMenu}>
      <Container maxWidth='md'>
        <Grid container spacing={6}>
          <Grid item xs={12} md={4}>
            {sidebarMenu && <SidebarSettings />}
          </Grid>
          <Grid item xs={12} md={8}>
            {children}
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}
