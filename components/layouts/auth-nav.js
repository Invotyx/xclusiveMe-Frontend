import { useRouter } from 'next/router';
import NextLink from 'next/link';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  grey: {
    color: '#666',
  },
}));

export default function AuthNav(props) {
  const { pathname } = useRouter();
  const classes = useStyles();
  return (
    <Box mt={8} mb={4} ml={2} display='flex' alignItems='center'>
      <Box>
        <NextLink passHref href='/register'>
          <Button
            variant='text'
            size={'/register' !== pathname ? 'small' : 'large'}
            className={'/register' !== pathname ? `${classes.grey}` : ``}
          >
            SIGN UP
          </Button>
        </NextLink>
      </Box>
      <Box mx={3}>
        <NextLink passHref href='/login'>
          <Typography component='p' variant='h5' className={`${classes.grey}`}>
            |
          </Typography>
        </NextLink>
      </Box>
      <Box>
        <NextLink passHref href='/login'>
          <Button
            variant='text'
            size={'/login' !== pathname ? 'small' : 'large'}
            className={'/login' !== pathname ? `${classes.grey}` : ``}
          >
            LOGIN
          </Button>
        </NextLink>
      </Box>
    </Box>
  );
}
