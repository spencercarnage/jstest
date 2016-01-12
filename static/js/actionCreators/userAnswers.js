'use strict';

import userAnswersActionTypes as actionTypes from '../actionTypes/userAnswers';

export function submitAnswer (answer) {
  return {
    type: actionTypes.ANSWER_SUBMITTED,
    id: answer.id,
    selected_answer: answer.selected_answer
  };
}
