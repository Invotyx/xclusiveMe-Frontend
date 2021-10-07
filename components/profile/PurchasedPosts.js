import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { post } from '../../actions/post';
import { purchasedPostsSelector } from '../../selectors/postSelector';
import Post from './post';

export default function PurchasedPosts(props) {
  const dispatch = useDispatch();

  const purchasedPosts = useSelector(purchasedPostsSelector);

  useEffect(() => {
    dispatch(post.requestPurchased());
  }, [dispatch]);

  return (
    <Box ml={{ xs: 0, sm: 0, md: 8 }} mr={{ xs: 0, sm: 0, md: 8 }}>
      <Grid container spacing={2}>
        {(!purchasedPosts || purchasedPosts.length === 0) && (
          <Grid item xs={12}>
            <Box textAlign='center' p={4}>
              <p>no content</p>
            </Box>
          </Grid>
        )}
        {purchasedPosts?.results?.map((post, i) => (
          <Grid item xs={12} key={`purchasedPosts${i}`}>
            <Post post={post} profileData={post.user} {...props} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
