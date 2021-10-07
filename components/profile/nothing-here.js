import NextLink from 'next/link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import NormalCaseButton from '../NormalCaseButton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  media: {
    height: 0,
  },
}));
export default function NothingHere({ me, ...props }) {
  const classes = useStyles();
  return (
    <Box textAlign='center' p={4} mt={15} {...props}>
      <img src='/nothing-here.svg' alt='no media' />
      <Box mt={-2}>
        <Typography gutterBottom>
          <span style={{ fontWeight: 500, fontSize: '20px' }}>
            No content found
          </span>{' '}
        </Typography>
      </Box>
      {!me && (
        <>
          <Box mb={2}>
            <Typography gutterBottom color='textSecondary' variant='caption'>
              <span style={{ fontWeight: 500, fontSize: '14px' }}>
                {' '}
                Looks like you need to start following people here
              </span>
            </Typography>
          </Box>
          <NextLink passHref href='/search'>
            <NormalCaseButton
              variant='outlined'
              style={{ border: '1px solid gray' }}
            >
              <span style={{ fontWeight: 500, fontSize: '16px' }}>
                Let’s find people
              </span>
            </NormalCaseButton>
          </NextLink>
        </>
      )}
    </Box>
  );
}
