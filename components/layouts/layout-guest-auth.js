import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AuthNav from './auth-nav';
import LayoutGuest from './layout-guest';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function LayoutGuestAuth({ children }) {
  const isSmall = useMediaQuery(theme => theme.breakpoints.down('md'));
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
