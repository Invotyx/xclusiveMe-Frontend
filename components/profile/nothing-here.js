import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import NormalCaseButton from '../NormalCaseButton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  media: {
    height: 0,
  },
}));
export default function NothingHere({ me }) {
  const classes = useStyles();
  return (
    <Box textAlign='center' p={4}>
      <img src='/nothing-here.svg' alt='no media' />
      <Box mt={-2}>
        <Typography gutterBottom>No content found</Typography>
      </Box>
      {!me && (
        <>
          <Box mb={2}>
            <Typography gutterBottom color='textSecondary' variant='caption'>
              Looks like you need to start following people here
            </Typography>
          </Box>
          <NextLink passHref href='/search'>
            <NormalCaseButton variant='outlined'>
              Let’s find people
            </NormalCaseButton>
          </NextLink>
        </>
      )}
    </Box>
  );
}
