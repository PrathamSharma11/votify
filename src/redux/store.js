import { configureStore } from '@reduxjs/toolkit';
import candidateReducer from '../slices/candidateSlice';

export const store = configureStore({
  reducer: {
    candidates: candidateReducer, // candidates स्लाइस को स्टोर में जोड़ें
  },
});
