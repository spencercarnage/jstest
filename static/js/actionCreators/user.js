'use strict';

import { userActionTypes as actionTypes } from '../actionTypes/user';

export function createUser (user) {
  return {
    type: actionTypes.USER_CREATED,
    id: user.id,
    username: user.username,
    profile_img: user.profile_img
  };
}

export function updateUserScore (score) {
  return {
    type: actionTypes.USER_SCORE_UPDATED,
    score: score
  };
}
