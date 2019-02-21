import {
    getRequest,
    postRequest
} from '../../Common/helpers/fetchUtilities';

import {
    API_ENDPOINTS,
    GetApiUrl,
    GetQueryApiUrl
} from '../constants/ApiInfo';
import ApiRequest from '../constants/ApiRequest';
import {
    acknowledgeNotifications,
    receivedMoreNotifications,
    receivedNewNotifications,
    receivedNotifications,
    requestMoreNotifications,
    requestNotifications
} from '../reducers/NotificationReducer';
import { addErrorMessage } from './MessageActions';

export function getNumberOfNewNotifications(sessionKey, displayName) {
    return (dispatch) => {
        const requestParams = {
            displayName,
            received: 'false'
        };
        return ApiRequest(getRequest(GetQueryApiUrl(API_ENDPOINTS.NOTIFICATION, requestParams), sessionKey), 'getNumberOfNewNotifications')
            .then((json) => {
                dispatch(receivedNewNotifications(json.numberOfNewNotifications));
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
            });
    };
}

export function getNotifications(sessionKey, displayName) {
    return (dispatch) => {
        const requestParams = {
            displayName
        };
        dispatch(requestNotifications());
        return ApiRequest(getRequest(GetQueryApiUrl(API_ENDPOINTS.NOTIFICATION, requestParams), sessionKey), 'getNotifications')
            .then((json) => {
                dispatch(receivedNotifications(json.notifications));
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
            });
    };
}

export function getMoreNotifications(sessionKey, displayName, lastNotificationId) {
    return (dispatch) => {
        const requestParams = {
            displayName,
            lastNotificationId
        };
        dispatch(requestMoreNotifications());
        return ApiRequest(getRequest(GetQueryApiUrl(API_ENDPOINTS.NOTIFICATION, requestParams), sessionKey), 'getMoreNotifications')
            .then((json) => {
                dispatch(receivedMoreNotifications(json.notifications));
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
            });
    };
}

export function acknowledgeAllNotifications(sessionKey, displayName) {
    return (dispatch) => {
        const requestParams = {
            displayName
        };
        return ApiRequest(postRequest(GetApiUrl(API_ENDPOINTS.NOTIFICATION), requestParams, sessionKey), 'acknowledgeAllNotifications')
            .then((json) => {
                dispatch(acknowledgeNotifications());
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
            });
    };
}
