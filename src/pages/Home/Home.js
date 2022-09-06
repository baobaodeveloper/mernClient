import {
  Box,
  Grid,
  Grow,
  Pagination,
  Paper,
  Stack,
} from '@mui/material';
import queryString from 'query-string';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { SearchField } from '../../components/form-control/SearchField';
import { Form } from '../../features/Form';
import { Posts } from '../../features/Posts';
import { fetchPost } from '../../features/Posts/postSlice';
import './style.scss';

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { search } = useLocation();
  const { pagination } = useSelector((state) => state.posts);
  const queryParams = useMemo(() => {
    const params = queryString.parse(search);
    return {
      ...params,
      page: params.page || 1,
      limit: params.limit || 8,
    };
  }, [search]);

  const handleChangePage = (event, value) => {
    const pagination = {
      ...queryParams,
      page: +value,
    };

    navigate({
      pathname: navigate.pathname,
      search: queryString.stringify(pagination),
    });
  };

  const handleSearch = (values) => {
    let search;
    if (values) {
      search = {
        ...queryParams,
        page: 1,
        title: values,
      };
    } else {
      search = {
        page: 1,
        limit: 8,
      };
    }

    navigate({
      pathname: navigate.pathname,
      search: queryString.stringify(search),
    });
  };

  useEffect(() => {
    navigate('/posts');
  }, [navigate]);

  useEffect(() => {
    navigate({
      pathname: navigate.pathname,
      search: queryString.stringify({
        ...queryParams,
      }),
    });
  }, []);

  useEffect(() => {
    dispatch(fetchPost(queryParams));
  }, [queryParams, dispatch]);
  return (
    <Grow in>
      <Grid
        container
        justifyContent='space-between'
        spacing={2}
        paddingX={4}
      >
        <Grid xs={12} md={8} lg={9} item>
          <Posts />
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Stack spacing={2}>
              <Pagination
                className='pagination'
                color='primary'
                count={
                  Math.ceil(
                    pagination?._totalRow / pagination?._limit
                  ) || 1
                }
                page={pagination?._page || 1}
                onChange={handleChangePage}
              />
            </Stack>
          </Box>
        </Grid>

        <Grid xs={12} md={4} lg={3} item>
          <Paper elevation={1} sx={{ marginBottom: '10px', p: 2 }}>
            <SearchField onSubmit={handleSearch} />
          </Paper>
          <Form />
        </Grid>
      </Grid>
    </Grow>
  );
};
