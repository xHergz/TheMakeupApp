import { createReducerObject } from '../../Common/helpers/reducerUtilities';

const SANITIZATION_QUIZ_ACTIONS = {
    REQUEST_SANITIZATION_QUIZ: 'REQUEST_SANITIZATION_QUIZ',
    RECEIVED_SANITIZATION_QUIZ: 'RECEIVED_SANITIZATION_QUIZ'
};

const initialState = {
    currentSanitizationQuizQuestions: [],
    fetchingSanitizationQuizQuestions: false
};

export default function sanitizationQuizReducer(state = initialState, action) {
    switch (action.type) {
        case SANITIZATION_QUIZ_ACTIONS.REQUEST_SANITIZATION_QUIZ: {
            return {
                ...state,
                fetchingSanitizationQuizQuestions: true
            };
        }
        case SANITIZATION_QUIZ_ACTIONS.RECEIVED_SANITIZATION_QUIZ: {
            return {
                ...state,
                fetchingSanitizationQuizQuestions: false,
                currentSanitizationQuizQuestions: action.payload
            };
        }
        default:
            return state;
    }
}

export function requestSanitizationQuizQuestions() {
    return createReducerObject(SANITIZATION_QUIZ_ACTIONS.REQUEST_SANITIZATION_QUIZ);
}

export function receivedSanitizationQuizQuestions(questions) {
    return createReducerObject(SANITIZATION_QUIZ_ACTIONS.RECEIVED_SANITIZATION_QUIZ, questions);
}
