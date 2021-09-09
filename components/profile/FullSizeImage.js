import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
  box: {
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundColor: 'rgba(0,0,0,0.3)',
    backgroundBlendMode: 'multiply',
  },
});
export default function FullSizeImage({ backgroundImage, children, ...props }) {
  const classes = useStyles();

  return (
    <Box
      py={8}
      bgcolor='#000'
      textAlign='center'
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className={classes.box}
      {...props}
    >
      {children}
    </Box>
  );
}
