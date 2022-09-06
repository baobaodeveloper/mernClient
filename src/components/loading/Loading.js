import { Box, CircularProgress } from '@mui/material';
import React from 'react';

export const Loading = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        inset: '0',
        zIndex: '10',
        backgroundColor: `rgba(0,0,0,0.6)`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress />
    </Box>
  );
};
