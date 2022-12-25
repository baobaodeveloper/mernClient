import LockIcon from '@mui/icons-material/Lock';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Typography,
} from '@mui/material';
import { red } from '@mui/material/colors';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { InputField } from '../../../components/form-control/InputField';
import { PasswordField } from '../../../components/form-control/PasswordField';
import { useSelector } from 'react-redux';

const schema = yup
  .object({
    email: yup
      .string()
      .email('Email is invalid')
      .required('Please enter your email'),
    password: yup
      .string()
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
        'Password must have at least 1 digit,1 lower case, 1 upper case and at least 8 character(0-9,a-z,A-Z)'
      )
      .required('Please enter your password'),
  })
  .required();
export const Login = ({ onSubmit }) => {
  const { loading } = useSelector((state) => state.auth);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });
  const handleSubmitForm = (values) => {
    if (onSubmit) onSubmit(values);
  };
  return (
    <Box width='100%'>
      <Box
        mb={2}
        display='flex'
        flexDirection='column'
        alignItems='center'
      >
        <Typography
          variant='h5'
          textAlign='center'
          fontWeight='bold'
          mb={1}
        >
          Login Form
        </Typography>
        <Avatar sx={{ bgcolor: red[600] }}>
          <LockIcon />
        </Avatar>
      </Box>
      <Box
        sx={{
          '& .MuiTextField-root': { mb: 2 },
        }}
        component='form'
        onSubmit={handleSubmit(handleSubmitForm)}
      >
        <InputField
          control={control}
          name='email'
          label='Email'
          errors={errors}
        />
        <PasswordField
          control={control}
          name='password'
          label='Password'
          errors={errors}
        />

        <Box textAlign='center'>
          <Button type='submit' variant='contained' color='info'>
            {loading && (
              <CircularProgress
                sx={{ marginRight: '10px' }}
                color='secondary'
                size='20px'
              />
            )}

            <Typography>Login</Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
