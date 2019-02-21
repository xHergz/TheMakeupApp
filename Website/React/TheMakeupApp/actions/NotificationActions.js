import { getRequest } from '../../Common/helpers/fetchUtilities';

import {
    API_ENDPOINTS,
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

export function temp() {

}
