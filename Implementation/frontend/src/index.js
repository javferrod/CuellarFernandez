import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { compose } from 'react';
import rootReducer from './reducers';
import App from './components/app';

import 'antd/dist/antd.css';

const loggerMiddleware = createLogger();
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(rootReducer,
			  composeEnhancer(applyMiddleware(thunkMiddleware, loggerMiddleware)));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
