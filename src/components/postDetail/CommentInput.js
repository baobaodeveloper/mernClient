import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';

export const CommentInput = ({ onSubmit }) => {
  const [comment, setComment] = useState('');

  const user = JSON.parse(localStorage.getItem('user'));

  const handleClick = () => {
    onSubmit({ message: `${user.username}: ${comment}` });
    setComment('');
  };
  return (
    <Box width='100%'>
      <TextField
        fullWidth
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        label='Message'
        multiline
        rows={4}
      />
      <Button
        onClick={handleClick}
        disabled={!comment}
        sx={{ mt: 2 }}
        variant='contained'
        fullWidth
      >
        Send Message
      </Button>
    </Box>
  );
};
