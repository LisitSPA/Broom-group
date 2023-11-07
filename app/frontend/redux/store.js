import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import apiMiddleware from './apiMiddleware';
import rootReducer from './reducers';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    persistedReducer,
    {},
    composeEnhancer(applyMiddleware(thunk, apiMiddleware))
  );

  const persistor = persistStore(store);

  return { store, persistor };
};
