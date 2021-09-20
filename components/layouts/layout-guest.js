import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import HomeLegend from '../home-legend';
import AuthNav from './auth-nav';
import LogoGuest from './logo-guest';

export default function LayoutGuest({ children }) {
  return (
    <Container>
      <Grid container component='main'>
        <Grid item xs={12}>
          <LogoGuest />
        </Grid>
        {children}
        <Grid item xs={12} md={7}>
          <HomeLegend />
        </Grid>
      </Grid>
    </Container>
  );
}
