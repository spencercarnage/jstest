'use strict';

export default function questionsReducer (state = [], action) {
  switch (action.type) {
    case 'ANSWER_SUBMITTED':
      return {
        ...state,
        selected_answer: state.selected_answer
      };
    default:
      return state;
  }
}
