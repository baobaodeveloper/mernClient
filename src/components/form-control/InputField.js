import { TextField } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

export const InputField = ({
  name = '',
  label = '',
  control,
  errors,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <TextField
          error={Boolean(errors[name]?.message)}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          mb={2}
          label={label}
          inputRef={ref}
          variant='outlined'
          fullWidth
          helperText={errors[name]?.message}
        />
      )}
    />
  );
};
