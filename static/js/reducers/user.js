'use strict';

import {userActionTypes} from '../actionTypes/user';

export default function userReducer (state = {}, action) {
  switch (action.type) {
    case userActionTypes.USER_CREATED:
      console.log('user created', state);
      return {
        id: action.id,
        username: action.username,
        profile_img: action.profile_img,
        score: 0
      };
    case userActionTypes.USER_SCORE_UPDATED:
      return {
        ...state,
        score: action.score
      };
    default:
      return state;
  }
}
