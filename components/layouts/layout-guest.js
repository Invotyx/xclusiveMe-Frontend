import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
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
        <Grid item xs={12} sm={4} md={7}>
          <HomeLegend />
        </Grid>
      </Grid>
    </Container>
  );
}
