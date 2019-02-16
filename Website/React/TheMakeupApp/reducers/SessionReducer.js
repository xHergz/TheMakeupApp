import { createReducerObject } from '../../Common/helpers/reducerUtilities';

const SESSION_ACTIONS = {
    SET_SESSION_KEY: 'SET_SESSION_KEY',
    REQUEST_SESSION_INFO: 'REQUEST_SESSION_INFO',
    RECEIVED_SESSION_INFO: 'RECEIVED_SESSION_INFO'
};

const initialState = {
    sessionKey: null,
    currentSession: {
        displayName: null,
        firstName: null,
        lastName: null,
        isArtist: null
    },
    isFetchingCurrentSession: false
};

export default function sessionReducer(state = initialState, action) {
    switch (action.type) {
        case SESSION_ACTIONS.SET_SESSION_KEY: {
            return {
                ...state,
                sessionKey: action.payload,
                isFetchingCurrentSession: action.payload === null
            };
        }
        case SESSION_ACTIONS.REQUEST_SESSION_INFO: {
            return {
                ...state,
                isFetchingCurrentSession: true
            };
        }
        case SESSION_ACTIONS.RECEIVED_SESSION_INFO: {
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

export function setSessionKey(sessionKey) {
    return createReducerObject(SESSION_ACTIONS.SET_SESSION_KEY, sessionKey);
}

export function requestSessionInfo() {
    return createReducerObject(SESSION_ACTIONS.REQUEST_SESSION_INFO);
}

export function receivedSessionInfo(sessionInfo) {
    return createReducerObject(SESSION_ACTIONS.RECEIVED_SESSION_INFO, sessionInfo);
}
