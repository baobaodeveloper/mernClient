import { Box, Button, Container, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Login } from './LoginForm';
import { Register } from './RegisterForm';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { login, offLoading, register } from './authSlice';

const MODE = {
  LOGIN: 'login',
  REGISTER: 'register',
};
export const Auth = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [mode, setMode] = useState(MODE.REGISTER);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleRegisterForm = async (values) => {
    try {
      await dispatch(register(values));
      enqueueSnackbar('Register success', { variant: 'success' });
    } catch (error) {
      dispatch(offLoading());
      enqueueSnackbar(
        error.response?.data?.message || 'Register faild',
        {
          variant: 'error',
        }
      );
      console.log(error);
    }
  };
  const handleLoginForm = async (values) => {
    try {
      await dispatch(login(values));
      enqueueSnackbar('Login success', { variant: 'success' });
    } catch (error) {
      dispatch(offLoading());
      enqueueSnackbar('Login Failed', { variant: 'error' });
      console.log(error);
    }
  };

  useEffect(() => {
    if (user?._id) {
      return navigate('/');
    }
  }, [user?._id, navigate]);
  return (
    <Container maxWidth='xs'>
      <Paper elevation={1} sx={{ padding: '15px' }}>
        {mode === 'register' ? (
          <Box>
            <Register onSubmit={handleRegisterForm} />
            <Box textAlign='center' mt={2}>
              <Button onClick={() => setMode(MODE.LOGIN)} mt={2}>
                You have a account?Login here
              </Button>
            </Box>
          </Box>
        ) : (
          <Box>
            <Login onSubmit={handleLoginForm} />
            <Box mt={2} textAlign='center'>
              <Button onClick={() => setMode(MODE.REGISTER)}>
                You dont have a account?Register here
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
  );
};
