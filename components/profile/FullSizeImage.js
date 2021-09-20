import makeStyles from '@mui/styles/makeStyles';
import Box from '@mui/material/Box';

const useStyles = makeStyles({
  box: {
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundColor: 'rgba(0,0,0,0.3)',
    backgroundBlendMode: 'multiply',
  },
});
export default function FullSizeImage({
  backgroundImage,
  style,
  children,
  ...props
}) {
  const classes = useStyles();

  return (
    <Box
      py={8}
      bgcolor='#000'
      textAlign='center'
      style={{ backgroundImage: `url(${backgroundImage})`, ...style }}
      className={classes.box}
      {...props}
    >
      {children}
    </Box>
  );
}
