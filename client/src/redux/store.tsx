import { configureStore } from '@reduxjs/toolkit';
import mapLoadingReducer from './reducers/mapLoading';

export const store = configureStore({
    reducer: {
      mapLoading : mapLoadingReducer,
    },
  });
  
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;