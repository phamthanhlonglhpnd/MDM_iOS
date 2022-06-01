import React from 'react'
import RootNavigation from './app/components/navigation/RootNavigation'
import { Provider } from 'react-redux';
import { persistor, store } from './app/store/store';
import { PersistGate } from 'redux-persist/integration/react';

export default function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <RootNavigation/>
      </PersistGate>
    </Provider>
  )
}