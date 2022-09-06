import { Box } from '@mui/material';
import React from 'react';

export const ImageField = ({
  setImage,
  setImageReset,
  imageReset,
}) => {
  return (
    <Box>
      <input
        value={imageReset}
        name='photo'
        onChange={(e) => {
          setImage(e.target.files[0]);
          setImageReset(e.target.value);
        }}
        type='file'
        accept='image/*'
      ></input>
    </Box>
  );
};
