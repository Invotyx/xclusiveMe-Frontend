import { useRouter } from 'next/router';
import NextLink from 'next/link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

export default function Comp(props) {
  const { asPath } = useRouter();
  const classes = props.classes;
  return (
    <Box mt={8} mb={4} ml={2} display='flex'>
      <Box>
        <NextLink href='/register'>
          <Typography
            component='h3'
            variant={'/login' === asPath ? 'h5' : 'h4'}
            className={'/login' === asPath ? `${classes.grey}` : ``}
          >
            SIGN UP
          </Typography>
        </NextLink>
      </Box>
      <Box mx={3}>
        <NextLink href='/login'>
          <Typography component='h3' variant='h5' className={`${classes.grey}`}>
            |
          </Typography>
        </NextLink>
      </Box>
      <Box>
        <NextLink href='/login'>
          <Typography
            component='h3'
            variant={'/register' === asPath ? 'h5' : 'h4'}
            className={'/register' === asPath ? `${classes.grey}` : ``}
          >
            LOGIN
          </Typography>
        </NextLink>
      </Box>
    </Box>
  );
}
