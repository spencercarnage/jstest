'use strict';

import {userActionTypes} from '../actionTypes/user';

export default function userReducer (state = {}, action) {
  switch (action.type) {
    case userActionTypes.USER_CREATED:
      return {
        id: state.id,
        username: state.username,
        profile_img: state.profile_img,
        score: 0
      };
    case userActionTypes.USER_SCORE_UPDATED:
      return {
        ...state,
        score: state.score
      };
    default:
      return state;
  }
}
