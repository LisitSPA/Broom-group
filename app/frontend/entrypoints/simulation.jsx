import "./stylesheets/main.scss";
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from '../redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Simulation } from '@/src';

const { store, persistor } = configureStore();

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Simulation/>
      </PersistGate>
    </Provider>,
    document.getElementById('app'),
  );
});
