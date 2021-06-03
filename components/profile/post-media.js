import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import PostMediaVideo from './post-media-video';

const useStyles = makeStyles(theme => ({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));
export default function PostMedia({ media }) {
  const classes = useStyles();
  return (
    <>
      {(!media || media.length === 0) && (
        <CardMedia
          className={classes.media}
          image='/no-media.jpg'
          title='no media'
        />
      )}
      {media &&
        media.length > 0 &&
        media.map((m, i) =>
          m.type.indexOf('video') !== -1 ? (
            <PostMediaVideo src={m.url} />
          ) : (
            <CardMedia
              key={`media${i}`}
              className={classes.media}
              image={m.url}
              title='post media'
            />
          )
        )}
    </>
  );
}
