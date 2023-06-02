import { configureStore } from '@reduxjs/toolkit';

import { shazamCoreApi } from './services/shazamCore';
import { coreApi } from './services/core';
import playerReducer from './features/playerSlice';
import coreReducer from './features/coreSlice';

export const store = configureStore({
  reducer: {
    [shazamCoreApi.reducerPath]: shazamCoreApi.reducer,
    [coreApi.reducerPath]: coreApi.reducer,
    player: playerReducer,
    core: coreReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      shazamCoreApi.middleware,
      coreApi.middleware,
    ]),
});
