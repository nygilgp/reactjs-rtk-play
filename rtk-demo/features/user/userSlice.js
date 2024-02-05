const createSlice = require('@reduxjs/toolkit').createSlice;
const createAsyncThunk = require('@reduxjs/toolkit').createAsyncThunk;
const axios = require('axios');

const url = 'https://jsonplaceholder.typicode.com/users';

const initialState = {
  loading: false,
  data: [],
  error: '',
};

const fetchUsers = createAsyncThunk('user/fetchUsers', () => {
  return axios
    .get(url)
    .then((response) => response.data.map((user) => user.id));
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.data = [];
        state.error = '';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.data = [];
        state.error = action.error.message;
      });
  },
});

module.exports = userSlice.reducer;
module.exports.fetchUsers = fetchUsers;
