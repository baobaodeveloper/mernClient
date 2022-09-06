import React, { useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

export const CommentMessage = () => {
  const {
    postDetail: { comments },
  } = useSelector((state) => state.postDetail);
  const crollRef = useRef();

  useState(() => {
    crollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [comments]);
  if (!comments) return <div></div>;
  return (
    <Box
      sx={{
        maxHeight: '180px',
        overflow: 'scroll',
        overflowX: 'hidden',
      }}
    >
      {comments.length > 0 &&
        comments.map((comment, idx) => (
          <Box key={idx}>
            <Typography sx={{ width: '100%' }} variant='body2'>
              <span
                style={{
                  fontWeight: 'bold',
                  fontSize: '18px',
                  marginRight: '10px',
                }}
              >
                {comment.split(': ')[0]}:
              </span>
              {comment.split(': ')[1]}
            </Typography>
            <div ref={crollRef}></div>
          </Box>
        ))}
    </Box>
  );
};
