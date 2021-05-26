import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import AuthNav from './auth-nav';
import LayoutGuest from './layout-guest';

export default function LayoutGuestAuth({ children }) {
  return (
    <LayoutGuest>
      <Grid item xs={12} sm={8} md={5}>
        <Box pl={8} pr={8} mx={4}>
          <AuthNav />
          {children}
        </Box>
      </Grid>
    </LayoutGuest>
  );
}
