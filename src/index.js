import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // import statement for react redux
import { createStore, combineReducers, applyMiddleware } from 'redux' // import statement for react redux store object + redux logger
import { createLogger } from 'redux-logger'; // import statement for redux logger debugger middleware
import thunkMiddleware from 'redux-thunk'; // import statement for redux thunk middleware
import { requestRobots, searchRobots } from './reducers.js'; // get searchRobots from reducer file for react redux
import RobotApp from './containers/RobotAppAPI'; //Original Method / API Method
import 'tachyons'; // imports tachyons module
import './css/index.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const logger = createLogger(); // initiate redux logger

//root reducer, combines multiple reducers into single 'root reducer'
const rootReducers = combineReducers({ requestRobots, searchRobots }) 

// react redux store state object + redux thunk + redux logger, runs in order or placement; thunk, then logger
const store = createStore(rootReducers, applyMiddleware(thunkMiddleware, logger)) 

// pass redux state to RobotApp
ReactDOM.render(
  <Provider store={store}>
    <RobotApp/>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();