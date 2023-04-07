import { configureStore } from '@reduxjs/toolkit';
import myCartSlice from './mycart-slice';
import uiSlice from './ui-slice';

const store = configureStore({
  reducer: { ui: uiSlice.reducer, myCart: myCartSlice.reducer },
});

export default store;
