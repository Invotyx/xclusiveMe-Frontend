import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: '100%',
  },
}));

export default function ImageGridList({ imagesData }) {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      {imagesData.map(
        (tile, i) =>
          tile && (
            <Grid item cols={12} md={4} key={i}>
              <Card>
                <CardMedia
                  image={tile.url}
                  title='post media'
                  className={classes.media}
                />
              </Card>
            </Grid>
          )
      )}
    </Grid>
  );
}
