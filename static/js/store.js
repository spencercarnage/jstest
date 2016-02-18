'use strict';

import { createStore, combineReducers, applyMiddleware } from 'redux';
// Reducers
import questionsReducer from './reducers/questions';
import userReducer from './reducers/user';
import userAnswersReducer from './reducers/userAnswers';
//import { routeReducer } from 'redux-simple-router';
import storageMiddleware from 'redux-localstorage';
import thunkMiddleware from 'redux-thunk';

const reducers = {
  questionsReducer,
  userReducer,
  userAnswersReducer
  //routing: routeReducer
}

const app = combineReducers(reducers);

const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

export default createStore(
  app,
  {},
  applyMiddleware(
    logger,
    storageMiddleware
  )
);
