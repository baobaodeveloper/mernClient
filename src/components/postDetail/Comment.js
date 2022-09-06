import React, { useState } from 'react';
import {} from '@mui/icons-material';
import { Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import { CommentMessage } from './CommentMessage';
import { CommentInput } from './CommentInput';
import { updateMessagePost } from '../../pages/PostDetail/postDetailSlice';

export const Comment = ({ id }) => {
  const dispatch = useDispatch();
  const handleSumit = (value) => {
    dispatch(updateMessagePost(id, value));
  };

  return (
    <Grid container py={2}>
      <Grid item xs={12} md={5}>
        <CommentMessage />
      </Grid>
      <Grid item xs={12} md={7}>
        <CommentInput onSubmit={handleSumit} />
      </Grid>
    </Grid>
  );
};
