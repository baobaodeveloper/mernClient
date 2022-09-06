import {
  Box,
  Container,
  Divider,
  Paper,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { PostDetailLike } from '../../components/postDetail/PostDetailLike';
import { PostDetailTop } from '../../components/postDetail/PostDetailTop';
import { noLoading } from '../../features/Posts/postSlice';
import { getPost, getPostLikeTags } from './postDetailSlice';

export const PostDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { postDetail, postLikeTags } = useSelector(
    (state) => state.postDetail
  );

  useEffect(() => {
    dispatch(noLoading());
    dispatch(getPost(id));
  }, [id, dispatch]);
  useEffect(() => {
    if (postDetail) {
      dispatch(getPostLikeTags(postDetail?.tags?.join(',')));
    }
  }, [postDetail, dispatch]);
  if (!postDetail) return <div></div>;
  return (
    <Paper elevation={2}>
      <Container maxWidth='xl'>
        <PostDetailTop postDetail={postDetail} />
        {postLikeTags?.posts?.length > 0 && (
          <Box mt={4}>
            <Typography variant='body2' sx={{ fontSize: '18px' }}>
              You might also like:
            </Typography>
            <Divider />
            <PostDetailLike
              postLikeTags={postLikeTags}
              idCurrent={postDetail._id}
            />
          </Box>
        )}
      </Container>
    </Paper>
  );
};
