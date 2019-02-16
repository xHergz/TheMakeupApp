import { createReducerObject } from '../../Common/helpers/reducerUtilities';

const MESSAGE_ACTIONS = {
    ADD_PAGE_MESSAGE: 'ADD_PAGE_MESSAGE',
    DISMISS_PAGE_MESSAGE: 'DISMISS_PAGE_MESSAGE',
    CLEAR_PAGE_MESSAGES: 'CLEAR_PAGE_MESSAGES'
};

const initialState = {
    messages: []
};

export default function messageReducer(state = initialState, action) {
    switch (action.type) {
        case MESSAGE_ACTIONS.ADD_PAGE_MESSAGE: {
            return {
                ...state,
                isFetchingCurrentSession: true
            };
        }
        case MESSAGE_ACTIONS.DISMISS_PAGE_MESSAGE: {
            return {
                ...state,
                currentSession: action.payload,
                isFetchingCurrentSession: false
            };
        }
        case MESSAGE_ACTIONS.CLEAR_PAGE_MESSAGES: {
            return {
                ...state,
                currentSession: action.payload,
                isFetchingCurrentSession: false
            };
        }
        default:
            return state;
    }
}

export function addPageMessage(type, message) {
    const newMessage = {
        type,
        message
    };
    return createReducerObject(MESSAGE_ACTIONS.ADD_PAGE_MESSAGE, newMessage);
}

export function dismissPageMessage(messageId) {
    return createReducerObject(MESSAGE_ACTIONS.DISMISS_PAGE_MESSAGE, messageId);
}

export function clearPageMessages() {
    return createReducerObject(MESSAGE_ACTIONS.CLEAR_PAGE_MESSAGES);
}
