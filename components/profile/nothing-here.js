import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
  },
}));
export default function NothingHere({}) {
  const classes = useStyles();
  return (
    <Box textAlign='center' p={4}>
      <img src='/nothing-here.svg' alt='no media' />
      <Typography>No content found</Typography>
      <Typography color='textSecondary'>
        Looks like you need to start following people here
      </Typography>
      <Button variant='outlined'>Let’s find people</Button>
    </Box>
  );
}
