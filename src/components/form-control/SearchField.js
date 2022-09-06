import {
  Box,
  FormControl,
  InputAdornment,
  OutlinedInput,
} from '@mui/material';
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

export const SearchField = ({ onSubmit }) => {
  const { search } = useLocation();
  const [values, setValues] = useState(
    queryString.parse(search)?.title || ''
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <Box component='form' onSubmit={handleSubmit}>
      <FormControl fullWidth>
        <OutlinedInput
          id='outlined-adornment-amount'
          placeholder='Seach...'
          value={values}
          onChange={(e) => setValues(e.target.value)}
          endAdornment={
            <InputAdornment position='end'>
              <SearchIcon sx={{ cursor: 'pointer' }} />
            </InputAdornment>
          }
        />
      </FormControl>
    </Box>
  );
};
