import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import { Box } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  media: {
    height: 0,
    paddingTop: '100%',
  },
}));

export default function ImageGridList({ imagesData }) {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      {(!imagesData || imagesData.length === 0) && (
        <Box flex={1} textAlign='center' p={4}>
          <div>no content</div>
        </Box>
      )}
      {imagesData?.map(
        (tile, i) =>
          tile && (
            <Grid item xs={12} md={4} key={i}>
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
