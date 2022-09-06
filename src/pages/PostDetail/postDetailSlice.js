import { createSlice } from '@reduxjs/toolkit';
import { postApi } from '../../api/postApi';

const slicePostDetail = createSlice({
  name: 'detailPost',
  initialState: {
    postDetail: null,
    postLikeTags: [],
  },
  reducers: {
    getPostDetail: (state, action) => {
      state.postDetail = action.payload;
    },
    getPostLike: (state, action) => {
      state.postLikeTags = action.payload;
    },
  },
});

export const { getPostDetail, getPostLike } = slicePostDetail.actions;

export const getPost = (id) => async (dispatch) => {
  try {
    const res = await postApi.getPostById(id);
    dispatch(getPostDetail(res));
  } catch (error) {
    console.log(error);
  }
};
export const getPostLikeTags = (params) => async (dispatch) => {
  try {
    const res = await postApi.getAllPost({ tags: params });
    dispatch(getPostLike(res));
  } catch (error) {
    console.log(error);
  }
};

export const updateMessagePost = (id, value) => async (dispatch) => {
  try {
    await postApi.updateMessage(id, value);
    dispatch(getPost(id));
  } catch (error) {
    console.log(error);
  }
};

const postDetailReducer = slicePostDetail.reducer;
export default postDetailReducer;
