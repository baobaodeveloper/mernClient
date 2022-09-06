import { Grid } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { Post } from './components/Post';

export const Posts = () => {
  const { posts } = useSelector((state) => state.posts);

  return (
    <Grid container direction='row' alignItems='stretch' spacing={5}>
      {posts.length > 0 &&
        posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={6} lg={3}>
            <Post key={post._id} post={post} />
          </Grid>
        ))}
    </Grid>
  );
};
