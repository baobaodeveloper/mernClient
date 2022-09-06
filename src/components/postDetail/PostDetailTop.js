import { Box, Divider, Grid, Typography } from '@mui/material';
import moment from 'moment';
import React from 'react';
import { THUMNAIL, URL_IMAGE } from '../../constants/common';
import { Comment } from './Comment';

export const PostDetailTop = ({ postDetail }) => {
  if (!postDetail) return <div></div>;

  return (
    <Grid
      container
      spacing={2}
      alignItems='stretch'
      flexDirection={{ xs: 'column-reverse', lg: 'row' }}
    >
      <Grid item md={12} lg={7}>
        <Typography component='h2' fontWeight='bold' variant='h4'>
          {postDetail.title}
        </Typography>
        <Box py={1}>
          {postDetail?.tags?.map((item, idx) => (
            <Typography
              sx={{ color: 'rgba(0,0,0,0.6)' }}
              key={idx}
              variant='body2'
            >
              #{item}
            </Typography>
          ))}
        </Box>
        <Typography
          sx={{
            fontSize: '18px',
            color: 'rgba(0,0,0,0.7)',
            fontStyle: 'italic',
          }}
          variant='body2'
        >
          {postDetail.message}
        </Typography>
        <Typography sx={{ mt: 2, fontSize: '18px' }} variant='body2'>
          Created by: {postDetail.name}
        </Typography>
        <Typography sx={{ mb: 2 }} variant='body2'>
          {moment(postDetail.createdAt).fromNow()}
        </Typography>
        <Divider />
        <Typography
          sx={{ py: 2, fontWeight: 'bold', cursor: 'pointer' }}
          variant='body2'
        >
          Realtime Chat-coming soon!
        </Typography>
        <Divider />

        <Comment id={postDetail._id} />

        <Divider />
      </Grid>
      <Grid item xs={12} lg={5}>
        <Box height={{ lg: 400, md: 350, xs: 300 }}>
          <img
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '15px',
            }}
            src={`${URL_IMAGE}/${postDetail.photo}` || THUMNAIL}
            alt={postDetail.title}
          />
        </Box>
      </Grid>
    </Grid>
  );
};
