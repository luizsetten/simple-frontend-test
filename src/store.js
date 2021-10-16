import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import loggerMiddleware from 'redux-logger';
import rootReducer from './reducers';
import rootSagas from './sagas';
import {
  enhancer as routesEnhancer,
  middleware as routesMiddleware,
} from './Routes';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = (typeof window !== 'undefined'
    && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
  || compose;

const store = createStore(
  rootReducer,
  {},
  composeEnhancers(
    routesEnhancer,
    applyMiddleware(sagaMiddleware, routesMiddleware, loggerMiddleware),
  ),
);

sagaMiddleware.run(rootSagas);

export default store;
