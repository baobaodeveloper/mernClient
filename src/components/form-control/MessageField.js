import { TextField } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

export const MessageField = ({
  name = '',
  label = '',
  errors,
  control,
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
          label={label}
          mb={2}
          multiline
          rows={4}
          inputRef={ref}
          variant='outlined'
          fullWidth
          helperText={errors[name]?.message}
        />
      )}
    />
  );
};
