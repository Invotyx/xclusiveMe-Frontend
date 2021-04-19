import { useRouter } from 'next/router';
import NextLink from 'next/link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  grey: {
    color: '#666',
  },
}));

export default function Comp(props) {
  const { asPath } = useRouter();
  const classes = useStyles();
  return (
    <Box mt={8} mb={4} ml={2} display='flex'>
      <Box>
        <NextLink href='/register'>
          <Typography
            component='a'
            variant={'/login' === asPath ? 'h6' : 'h5'}
            className={'/login' === asPath ? `${classes.grey}` : ``}
          >
            SIGN UP
          </Typography>
        </NextLink>
      </Box>
      <Box mx={3}>
        <NextLink href='/login'>
          <Typography component='p' variant='h5' className={`${classes.grey}`}>
            |
          </Typography>
        </NextLink>
      </Box>
      <Box>
        <NextLink href='/login'>
          <Typography
            component='a'
            variant={'/register' === asPath ? 'h6' : 'h5'}
            className={'/register' === asPath ? `${classes.grey}` : ``}
          >
            LOGIN
          </Typography>
        </NextLink>
      </Box>
    </Box>
  );
}
