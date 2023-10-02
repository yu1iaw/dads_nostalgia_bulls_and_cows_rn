import { configureStore } from '@reduxjs/toolkit';
import history from './historySlice';
import switchesSlice from './switchesSlice';


const store = configureStore({
  reducer: {
    memorise: history,
    switches: switchesSlice
  }
})

export default store;