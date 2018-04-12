import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import reducer from '../reducer';
import createSagaMiddleware from 'redux-saga';
import history from '../history';
import rootSaga from '../saga';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware, routerMiddleware(history)),
);

const store = createStore(reducer, enhancer);

sagaMiddleware.run(rootSaga);

//dev only, no need in prod
window.store = store;

export default store;
