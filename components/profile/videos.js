import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import PostMediaVideo from './post-media-video';
import { Box } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { post } from '../../actions/post';
import { singleDataVideosSelector } from '../../selectors/postSelector';

const useStyles = makeStyles(theme => ({
  media: {
    height: 0,
    paddingTop: '100%',
  },
}));

export default function VideoGridList({ username }) {
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (username) {
      dispatch(post.requestOneVideos(username));
    }
  }, [username]);
  const videosData = useSelector(singleDataVideosSelector);
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      {(!videosData || videosData.length === 0) && (
        <Box flex={1} textAlign='center' p={4}>
          <div>no content</div>
        </Box>
      )}
      {videosData?.map(
        (tile, i) =>
          tile && (
            <Grid item xs={12} md={4} key={i}>
              <Card>
                <PostMediaVideo thumbnail={tile.thumbnail} src={tile.url} />
              </Card>
            </Grid>
          )
      )}
    </Grid>
  );
}
