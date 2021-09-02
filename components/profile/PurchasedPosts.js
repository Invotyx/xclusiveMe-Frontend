import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { post } from '../../actions/post';
import { purchasedPostsSelector } from '../../selectors/postSelector';
import Post from './post';

export default function PurchasedPosts() {
  const dispatch = useDispatch();

  const purchasedPosts = useSelector(purchasedPostsSelector);

  useEffect(() => {
    dispatch(post.requestPurchased());
  }, [dispatch]);

  return (
    <Grid container spacing={2}>
      {(!purchasedPosts || purchasedPosts.length === 0) && (
        <Grid item xs={12}>
          <Box textAlign='center' p={4}>
            <p>no content</p>
          </Box>
        </Grid>
      )}
      {purchasedPosts?.map((post, i) => (
        <Grid item xs={12} md={4} key={`purchasedPosts${i}`}>
          <Post
            post={post}
          />
        </Grid>
      ))}
    </Grid>
  );
}