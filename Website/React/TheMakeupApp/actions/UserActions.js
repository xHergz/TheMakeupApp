import {
    deleteRequest,
    getRequest,
    postRequest
} from '../../Common/helpers/fetchUtilities';

import {
    API_ENDPOINTS,
    GetQueryApiUrl,
    GetSessionKey,
    GetUidApiUrl
} from '../constants/ApiInfo';
import ApiRequest from '../constants/ApiRequest';
import {
    requestUserInfo,
    receivedUserInfo,
    enableEditingUser,
    cancelEditingUser,
    requestUpdateUser,
    receivedUpdateUser,
    requestDeactivateUser,
    receivedDeactivateUser
} from '../reducers/UserReducer';
import {
    addErrorMessage,
    addSuccessMessage
} from './MessageActions';
import { getSessionInfo } from './SessionActions';

export function getUserInfo(displayName) {
    const sessionKey = GetSessionKey();
    const userQueryData = {
        displayName
    };
    return (dispatch) => {
        dispatch(requestUserInfo());
        return ApiRequest(getRequest(GetQueryApiUrl(API_ENDPOINTS.USER, userQueryData), sessionKey), 'getUserInfo')
            .then((json) => {
                dispatch(receivedUserInfo(json.user));
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
                dispatch(receivedUserInfo(null));
            });
    };
}

export function enableUserEditing() {
    return (dispatch) => {
        dispatch(enableEditingUser());
    };
}

export function cancelUserEditing() {
    return (dispatch) => {
        dispatch(cancelEditingUser());
    };
}

export function updateUser(userId, email, password, confirmPassword, displayName, firstName, lastName) {
    const sessionKey = GetSessionKey();
    const requestParams = {
        email,
        password,
        confirmPassword,
        displayName,
        firstName,
        lastName
    };
    return (dispatch) => {
        dispatch(requestUpdateUser());
        return ApiRequest(postRequest(GetUidApiUrl(API_ENDPOINTS.USER, userId), requestParams, sessionKey), 'updateUser')
            .then((json) => {
                dispatch(receivedUpdateUser());
                dispatch(cancelUserEditing());
                dispatch(addSuccessMessage('User information successfully updated'));
                dispatch(getSessionInfo());
                dispatch(getUserInfo(displayName));
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
                dispatch(receivedUpdateUser());
            });
    };
}

export function deactivateUser(userId) {
    const sessionKey = GetSessionKey();
    return (dispatch) => {
        dispatch(requestDeactivateUser());
        return ApiRequest(deleteRequest(GetUidApiUrl(API_ENDPOINTS.USER, userId), sessionKey), 'deactivateUser')
            .then((json) => {
                dispatch(receivedDeactivateUser());
                dispatch(addSuccessMessage('User information successfully deactivated'));
                window.location.href = '/logout';
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
                dispatch(receivedDeactivateUser());
            });
    };
}
