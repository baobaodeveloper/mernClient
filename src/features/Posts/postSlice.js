import { createSlice } from '@reduxjs/toolkit';
import { postApi } from '../../api/postApi';

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    like: 0,
    pagination: {},
    loading: false,
    id: null,
    setLike: 0,
  },
  reducers: {
    getAllPost: (state, action) => {
      state.posts = action.payload.posts;
    },
    getPagination: (state, action) => {
      state.pagination = action.payload.pagination;
    },
    idUpdatePost: (state, action) => {
      state.id = action.payload;
    },
    setIdUpdatePostNull: (state, action) => {
      state.id = null;
    },
    loading: (state) => {
      state.loading = true;
    },
    noLoading: (state) => {
      state.loading = false;
    },
    increaseLike: (state, action) => {
      const post = state.posts.find(
        (item) => item._id === action.payload
      );
      const userCurrent = JSON.parse(localStorage.getItem('user'));

      const userAlreadyLike = post.like.findIndex(
        (userId) => userId === userCurrent._id
      );

      if (userAlreadyLike !== -1) {
        post.like.splice(userAlreadyLike, 1);
      } else {
        post.like.push(userCurrent._id);
      }
    },
  },
});

export const {
  getAllPost,
  noLoading,
  loading,
  increaseLike,
  idUpdatePost,
  setIdUpdatePostNull,
  getPagination,
} = postSlice.actions;

export const fetchPost = (newParams) => async (dispatch) => {
  const res = await postApi.getAllPost(newParams);
  dispatch(getAllPost(res));
  dispatch(getPagination(res));
};

export const createPostDetail =
  (data, pagination) => async (dispatch) => {
    try {
      dispatch(loading());
      const res = await postApi.createPost(data);
      dispatch(
        fetchPost({
          limit: pagination._limit,
          page: pagination._page,
        })
      );
    } catch (error) {
      console.log(error);
    }
    dispatch(noLoading());
  };

export const updatePostDetail =
  (data, id, pagination) => async (dispatch) => {
    try {
      dispatch(loading());
      const res = await postApi.updatePost(data, id);
      dispatch(
        fetchPost({
          page: pagination._page,
          limit: pagination._limit,
        })
      );
    } catch (error) {
      console.log(error);
    }
    dispatch(noLoading());
  };

export const deletePost = (id, pagination) => async (dispatch) => {
  try {
    dispatch(loading(id));
    const res = await postApi.deletePost(id);
    const endPost =
      `${+pagination._totalRow - pagination._limit}`.slice(-1) === '1'
        ? pagination._page - 1
        : pagination._page;
    dispatch(fetchPost({ limit: pagination._limit, page: endPost }));
  } catch (error) {
    console.log(error);
  }
  dispatch(noLoading());
};

export const updateLikes = (id, pagination) => async (dispatch) => {
  try {
    const res = await postApi.updateLike(id);
    dispatch(increaseLike(id));
    dispatch(
      fetchPost({ limit: pagination._limit, page: pagination._page })
    );
  } catch (error) {
    console.log(error);
  }
};

const postReducer = postSlice.reducer;
export default postReducer;
