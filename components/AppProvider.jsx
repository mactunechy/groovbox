'use client';

import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { store } from '@redux/store';

const AppProvider = ({ children }) => {
  return <StoreProvider store={store}>{children}</StoreProvider>;
};

export default AppProvider;
