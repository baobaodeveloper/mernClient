import { createSlice } from '@reduxjs/toolkit';
import { authApi } from '../../api/authApi';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || {},
  },
  loading: false,
  reducers: {
    loading: (state) => {
      state.loading = true;
    },
    offLoading: (state) => {
      state.loading = false;
    },
    logout: (state) => {
      state.user = {};
      state.loading = false;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
    getInforUser: (state, actions) => {
      state.user = actions.payload;
    },
  },
});

export const { loading, offLoading, getInforUser, logout } =
  authSlice.actions;

export const register = (data) => async (dispatch) => {
  try {
    dispatch(loading());
    const { user, token } = await authApi.register(data);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', JSON.stringify(token));
    dispatch(getInforUser(user));
  } catch (error) {
    console.log(error);

    dispatch(offLoading());
  }
};
export const login = (data) => async (dispatch) => {
  try {
    dispatch(loading());
    console.log(data);
    const { user, token } = await authApi.login(data);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', JSON.stringify(token));
    dispatch(getInforUser(user));
  } catch (error) {
    dispatch(offLoading());
    console.log(error);
  }
};

const authReducer = authSlice.reducer;

export default authReducer;
