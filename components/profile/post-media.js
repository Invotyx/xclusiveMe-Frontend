import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PostMediaVideo from './post-media-video';

const useStyles = makeStyles(theme => ({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
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
export default function PostMedia({ media }) {
  return (
    <>
      {/* (!media || media.length === 0) && (
        <MediaElement m={{ url: '/no-media.jpg' }} />
      ) */}
      {media && media.length > 0 && (
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <MediaElement m={media[0]} />
          </Grid>
          {media.slice(1).map((m, i) => (
            <Grid item xs={12} md={4} key={`media${i}`}>
              <MediaElement m={m} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}
