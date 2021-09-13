import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import AuthNav from './auth-nav';
import LayoutGuest from './layout-guest';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export default function LayoutGuestAuth({ children }) {
  const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
  return (
    <LayoutGuest>
      <Grid item xs={12} md={5}>
        <Box pl={isSmall ? 0 : 8} pr={isSmall ? 0 : 8} mx={isSmall ? 0 : 4}>
          <AuthNav />
          {children}
        </Box>
      </Grid>
    </LayoutGuest>
  );
}
