import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Link, useNavigate } from 'react-router-dom';
import decode from 'jwt-decode';
import { logout } from '../../features/auth/authSlice';
import memories from '../../images/memories.png';
import {
  getFirstLetter,
  upperCaseFirstLetter,
} from '../../utils/common';
export const Header = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const token = JSON.parse(localStorage.getItem('token'));

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleLogout = () => {
    dispatch(logout());
    setAnchorEl(null);
    enqueueSnackbar('Logout success', { variant: 'success' });
  };
  useEffect(() => {
    if (!user?._id) {
      navigate('/auth');
    }
  }, [user?._id, navigate]);

  useEffect(() => {
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        dispatch(logout());
      }
    }
  }, [token, dispatch]);
  return (
    <Paper
      elevation={1}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '50px 0',
        padding: '10px 20px',
        borderRadius: '20px',
      }}
    >
      <Link
        to='/'
        style={{
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none',
        }}
      >
        <Typography component='h2' variant='h5' color='primary'>
          Memories
        </Typography>
        <Box width='60px'>
          <img src={memories} width='100%' alt='memories' />
        </Box>
      </Link>
      {user?._id ? (
        <Box
          id='basic-button'
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={(e) => setAnchorEl(e.currentTarget)}
          sx={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <Avatar sx={{ bgcolor: deepOrange[500] }}>
            {getFirstLetter(user.username)}
          </Avatar>
          <Typography fontWeight='bold'>
            {upperCaseFirstLetter(user.username)}
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{ display: 'flex', alignItems: 'center', gap: '50px' }}
        >
          <Link to='/auth' style={{ textDecoration: 'none' }}>
            <Button variant='contained' color='primary'>
              Register
            </Button>
          </Link>
        </Box>
      )}
      <Menu
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleLogout}>
          <Button>Logout</Button>
        </MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>
          <Button>Profile</Button>
        </MenuItem>
      </Menu>
    </Paper>
  );
};
