import { Container } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/header/Header';

export const HomeTemplate = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/auth');
  }, [user, navigate]);
  return (
    <Container maxWidth='xl' sx={{ marginBottom: '20px' }}>
      <Header />
      {children}
    </Container>
  );
};
