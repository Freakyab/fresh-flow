import { configureStore } from "@reduxjs/toolkit";
import mapLoadingReducer from "./reducers/mapLoading";
import cropsMap from "./reducers/cropsMap";
import customerOrderCartItem from "./reducers/CustomerOrderCartItems";
import storage from "redux-persist/lib/storage";
import userDetails from "./reducers/userDetails";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

// const persistedReducer = persistReducer(persistConfig, customerOrderCartItem);
const persistedUserReducer = persistReducer(persistConfig, userDetails);
 

export const store = configureStore({
  reducer: {
    mapLoading: mapLoadingReducer,
    cropsMap: cropsMap,
    // customerOrderCartItem: persistedReducer,
    customerOrderCartItem: customerOrderCartItem,
    userDetails: persistedUserReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
