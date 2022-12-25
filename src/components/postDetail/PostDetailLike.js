import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import React from 'react';
import moment from 'moment';
import { THUMNAIL, URL_IMAGE } from '../../constants/common';
import { upperCaseFirstLetter } from '../../utils/common';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loading } from '../../features/Posts/postSlice';

export const PostDetailLike = ({ postLikeTags, idCurrent }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = (id) => {
    dispatch(loading());

    const timeWait = setTimeout(() => navigate(`/posts/${id}`), 1000);

    return () => {
      clearInterval(timeWait);
    };
  };
  return (
    <Grid container p={2} spacing={{ md: 6, sm: 4, xs: 2 }}>
      {postLikeTags.posts
        .filter((post) => post._id !== idCurrent)
        .map((post) => (
          <Grid key={post._id} item xs={12} sm={6} lg={3}>
            <Card
              onClick={() => handleClick(post._id)}
              sx={{
                width: '100%',
                height: '100%',
                borderRadius: '20px',
                position: 'relative',
                cursor: 'pointer',
              }}
            >
              <Box
                display='flex'
                left='0'
                right='0'
                top='10px'
                justifyContent='space-between'
                alignItems='center'
                position='absolute'
                color='white'
                zIndex={10}
                paddingX={3}
              >
                <Box>
                  <Typography variant='h6'>{post.name}</Typography>
                  <Typography variant='body2'>
                    {moment(new Date(post.createdAt).toUTCString())
                      .startOf('day')
                      .fromNow()}
                  </Typography>
                </Box>
              </Box>

              <CardMedia
                sx={{
                  objectFit: 'cover',
                }}
                component='img'
                height='180px'
                image={
                  post.photo ? `${URL_IMAGE}/${post.photo}` : THUMNAIL
                }
                alt='Paella dish'
              />
              <Box
                display='flex'
                flexDirection='column'
                minHeight='200px'
              >
                <CardContent sx={{ paddingBottom: '0px' }}>
                  <Box display='flex'>
                    {post.tags?.length > 0 &&
                      post.tags
                        .join(' ')
                        .split(',')
                        .map((tag, idx) => (
                          <Typography
                            key={idx}
                            variant='body2'
                            color='text.secondary'
                          >
                            #{tag}
                          </Typography>
                        ))}
                  </Box>
                  <Typography py={1} variant='h6'>
                    {upperCaseFirstLetter(post?.title.slice(0, 30))}
                    ...
                  </Typography>
                  <Typography variant='body2'>{`${post?.message.slice(
                    0,
                    50
                  )}...`}</Typography>
                </CardContent>
              </Box>
            </Card>
          </Grid>
        ))}
    </Grid>
  );
};
