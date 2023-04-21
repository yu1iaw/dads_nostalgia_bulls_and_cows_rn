import { configureStore } from '@reduxjs/toolkit';
import history from './historySlice';

const store = configureStore({
  reducer: {
    memorise: history,
  }
})

export default store;