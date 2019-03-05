import { createReducerObject } from '../../Common/helpers/reducerUtilities';

const USER_ACTIONS = {
    REQUEST_USER_INFO: 'REQUEST_USER_INFO',
    RECEIVED_USER_INFO: 'RECEIVED_USER_INFO',
    ENABLE_EDITING_USER: 'ENABLE_EDITING_USER',
    CANCEL_EDITING_USER: 'CANCEL_EDITING_USER',
    REQUEST_UPDATE_USER: 'REQUEST_UPDATE_USER',
    RECEIVED_UPDATE_USER: 'RECEIVED_UPDATE_USER',
    REQUEST_DEACTIVATE_USER: 'REQUEST_DEACTIVATE_USER',
    RECEIVED_DEACTIVATE_USER: 'RECEIVED_DEACTIVATE_USER'
};

const initialState = {
    currentUser: null,
    editingUser: false,
    fetchingUserInfo: false,
    fetchingUpdateUser: false,
    fetchingDeactivateUser: false
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case USER_ACTIONS.REQUEST_USER_INFO: {
            return {
                ...state,
                fetchingUserInfo: true
            };
        }
        case USER_ACTIONS.RECEIVED_USER_INFO: {
            return {
                ...state,
                currentUser: action.payload,
                fetchingUserInfo: false
            };
        }
        case USER_ACTIONS.ENABLE_EDITING_USER: {
            return {
                ...state,
                editingUser: true
            };
        }
        case USER_ACTIONS.CANCEL_EDITING_USER: {
            return {
                ...state,
                editingUser: false
            };
        }
        case USER_ACTIONS.REQUEST_UPDATE_USER: {
            return {
                ...state,
                fetchingUpdateUser: true
            };
        }
        case USER_ACTIONS.RECEIVED_UPDATE_USER: {
            return {
                ...state,
                fetchingUpdateUser: false
            };
        }
        case USER_ACTIONS.REQUEST_DEACTIVATE_USER: {
            return {
                ...state,
                fetchingDeactivateUser: true
            };
        }
        case USER_ACTIONS.RECEIVED_DEACTIVATE_USER: {
            return {
                ...state,
                fetchingDeactivateUser: false
            };
        }
        default:
            return state;
    }
}

export function requestUserInfo() {
    return createReducerObject(USER_ACTIONS.REQUEST_USER_INFO);
}

export function receivedUserInfo(userInfo) {
    return createReducerObject(USER_ACTIONS.RECEIVED_USER_INFO, userInfo);
}

export function enableEditingUser() {
    return createReducerObject(USER_ACTIONS.ENABLE_EDITING_USER);
}

export function cancelEditingUser() {
    return createReducerObject(USER_ACTIONS.CANCEL_EDITING_USER);
}

export function requestUpdateUser() {
    return createReducerObject(USER_ACTIONS.REQUEST_UPDATE_USER);
}

export function receivedUpdateUser() {
    return createReducerObject(USER_ACTIONS.RECEIVED_UPDATE_USER);
}

export function requestDeactivateUser() {
    return createReducerObject(USER_ACTIONS.REQUEST_DEACTIVATE_USER);
}

export function receivedDeactivateUser() {
    return createReducerObject(USER_ACTIONS.RECEIVED_DEACTIVATE_USER);
}
