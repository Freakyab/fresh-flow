import { configureStore } from '@reduxjs/toolkit';
import mapLoadingReducer from './reducers/mapLoading';
import cropsMap from './reducers/cropsMap';

export const store = configureStore({
    reducer: {
      mapLoading : mapLoadingReducer,
      cropsMap : cropsMap,
    },
  });
  
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;