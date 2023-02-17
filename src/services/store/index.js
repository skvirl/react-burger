import { configureStore } from '@reduxjs/toolkit';
import burgerReducer from '../reducers/burgerSlice';

const store =  configureStore({
  reducer: {
    burger: burgerReducer,
  },
});


export default store;