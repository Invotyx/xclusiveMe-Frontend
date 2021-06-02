import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import PostMediaVideo from './post-media-video';

const useStyles = makeStyles(theme => ({
  media: {
    height: 0,
    paddingTop: '100%',
  },
}));

export default function Videos({ videosData }) {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      {videosData?.map(
        (tile, i) =>
          tile && (
            <Grid item cols={12} md={4} key={i}>
              <Card>
                <PostMediaVideo src={tile.url} />
              </Card>
            </Grid>
          )
      )}
    </Grid>
  );
}
