import { Box, Grid } from '@material-ui/core';
import React from 'react';
import LockIcon from '@material-ui/icons/Lock';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import PostMediaVideo from './post-media-video';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  media: {
    width: '40vw',
    height: '30vw',
    paddingTop: '56.25%', // 16:9
  },
  locked: {
    backgroundImage: `url('/post-blurred.jpg')`,
    width: '40vw',
    height: '30vw',
    backgroundRepeat: 'no-repeat',
    backgroundColor: 'rgba(0,0,0,0.3)',
    backgroundBlendMode: 'multiply',
  },
  paper: {
    backgroundColor: 'black',
    border: 'none',
    boxShadow: theme.shadows[5],
    width: '40vw',
    height: 'auto',
  },
}));

function MediaElement({ m }) {
  const classes = useStyles();

  return m.type && m.type.indexOf('video') !== -1 ? (
    <div
      style={{
        width: '40vw',
        height: '30vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <PostMediaVideo src={m.url} />
    </div>
  ) : (
    <CardMedia className={classes.media} image={m.url} title='post media' />
  );
}

const SinglePostMedia = ({ media, mediaCount, singlePost }) => {
  const classes = useStyles();
  return (
    <div>
      {mediaCount > media?.length &&
        Array.apply(null, Array(1)).map(() => (
          <Grid item xs={12} key={Math.random()}>
            <Box py={8} bgcolor='#000' className={classes.locked}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '20vh',
                }}
              >
                <LockIcon />
              </div>
            </Box>
          </Grid>
        ))}

      {media && media.length > 0 && (
        <>
          {/* <Grid item xs={12}>
            <MediaElement m={media[0]} />
          </Grid> */}
          <Carousel autoPlay={false} animation={'slide'}>
            {media.map((m, i) => (
              <div index={i} key={`media${i}`}>
                <MediaElement m={m} />
              </div>
            ))}
          </Carousel>
        </>
      )}
    </div>
  );
};

export default SinglePostMedia;
