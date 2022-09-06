import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import postReducer from '../features/Posts/postSlice';
import postDetailReducer from '../pages/PostDetail/postDetailSlice';
// ...
const store = configureStore({
  reducer: {
    posts: postReducer,
    auth: authReducer,
    postDetail: postDetailReducer,
  },
});

export default store;
