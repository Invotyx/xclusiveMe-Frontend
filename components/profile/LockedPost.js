import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import LockIcon from '@material-ui/icons/Lock';

const useStyles = makeStyles(theme => ({
  locked: {
    backgroundImage: `url('/post-blurred.jpg')`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundColor: 'rgba(0,0,0,0.3)',
    backgroundBlendMode: 'multiply',
  },
}));
export default function LockedPost(props) {
  const classes = useStyles();

  return (
    <Box
      py={8}
      bgcolor='#000'
      textAlign='center'
      className={classes.locked}
      {...props}
    >
      <LockIcon />
    </Box>
  );
}
