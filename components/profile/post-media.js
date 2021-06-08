import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import PostMediaVideo from './post-media-video';
import LockIcon from '@material-ui/icons/Lock';

const useStyles = makeStyles(theme => ({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  locked: {
    backgroundImage: `url('/post-blurred.jpg')`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundColor: 'rgba(0,0,0,0.3)',
    backgroundBlendMode: 'multiply',
  },
}));
function MediaElement({ m }) {
  const classes = useStyles();
  return m.type && m.type.indexOf('video') !== -1 ? (
    <PostMediaVideo src={m.url} />
  ) : (
    <CardMedia className={classes.media} image={m.url} title='post media' />
  );
}
export default function PostMedia({ media, mediaCount }) {
  const classes = useStyles();
  return (
    <Grid container spacing={1}>
      {mediaCount > media.length &&
        Array.apply(null, Array(1)).map(() => (
          <Grid item xs={12} key={Math.random()}>
            <Box
              py={8}
              bgcolor='#000'
              textAlign='center'
              className={classes.locked}
            >
              <LockIcon />
            </Box>
          </Grid>
        ))}
      {/* (!media || media.length === 0) && (
        <MediaElement m={{ url: '/no-media.jpg' }} />
      ) */}
      {media && media.length > 0 && (
        <>
          <Grid item xs={12}>
            <MediaElement m={media[0]} />
          </Grid>
          {media.slice(1).map((m, i) => (
            <Grid item xs={12} md={4} key={`media${i}`}>
              <MediaElement m={m} />
            </Grid>
          ))}
        </>
      )}
    </Grid>
  );
}
