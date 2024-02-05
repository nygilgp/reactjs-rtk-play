import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import cakeReucer from '../features/cake/cakeSlice';
import icecreamReducer from '../features/icecream/icecreamSlice';
import userReducer from '../features/user/userSlice';
import { apiSlice } from '../features/api/apiSlice';

const logger = createLogger();

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cake: cakeReucer,
    icecream: icecreamReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger).concat(apiSlice.middleware),
});

export default store;
