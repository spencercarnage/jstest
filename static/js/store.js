'use strict';

import { createStore, combineReducers } from 'redux';
// Reducers
import questionsReducer from './reducers/questions';
import userReducer from './reducers/user';
import userAnswersReducer from './reducers/userAnswers';
import { routeReducer } from 'redux-simple-router';

const reducer = combineReducers(Object.assign({}, {
  questionsReducer,
  userReducer,
  userAnswersReducer
}, {
  routing: routeReducer
}));

export default createStore(reducer);
