import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Loading } from './components/loading/Loading';
import { Auth } from './features/auth';
import { Home } from './pages/Home/Home';
import { PostDetail } from './pages/PostDetail/PostDetail';
import { HomeTemplate } from './template/HomeTemplate';

function App() {
  const { loading } = useSelector((state) => state.posts);
  return (
    <Box>
      {loading && <Loading />}
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <HomeTemplate>
                <Home />
              </HomeTemplate>
            }
          />

          <Route
            path='/posts'
            element={
              <HomeTemplate>
                <Home />
              </HomeTemplate>
            }
          />

          <Route
            path='/auth'
            element={
              <HomeTemplate>
                <Auth />
              </HomeTemplate>
            }
          />

          <Route
            path='/posts/:id'
            element={
              <HomeTemplate>
                <PostDetail />
              </HomeTemplate>
            }
          />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
