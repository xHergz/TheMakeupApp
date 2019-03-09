import {
    getRequest,
    deleteRequest,
    putRequest
} from '../../Common/helpers/fetchUtilities';

import {
    API_ENDPOINTS,
    GetSessionKey,
    GetApiUrl,
    GetQueryApiUrl,
    GetUidApiUrl
} from '../constants/ApiInfo';
import ApiRequest from '../constants/ApiRequest';
import {
    requestClientHeadshots,
    receivedClientHeadshots,
    requestAddClientHeadshot,
    receivedAddClientHeadshot,
    requestRemoveClientHeadshot,
    receivedRemoveClientHeadshot,
    enableEditingclientHeadshots,
    disableEditingclientHeadshots
} from '../reducers/ClientHeadshotReducer';
import {
    addErrorMessage,
    addSuccessMessage
} from './MessageActions';

export function getClientHeadshots(displayName) {
    const sessionKey = GetSessionKey();
    const queryData = {
        displayName
    };
    return (dispatch) => {
        dispatch(requestClientHeadshots());
        return ApiRequest(getRequest(GetQueryApiUrl(API_ENDPOINTS.CLIENT_HEADSHOT, queryData), sessionKey), 'getClientHeadshots')
            .then((json) => {
                dispatch(receivedClientHeadshots(json.clientHeadshots));
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
                dispatch(receivedClientHeadshots([]));
            });
    };
}

export function addClientHeadshot(clientProfileId, picture, headshotTypeId, displayName) {
    const sessionKey = GetSessionKey();
    const clientHeadshotData = {
        clientProfileId,
        picture,
        headshotTypeId
    };
    return (dispatch) => {
        dispatch(requestAddClientHeadshot());
        return ApiRequest(putRequest(GetApiUrl(API_ENDPOINTS.CLIENT_HEADSHOT), clientHeadshotData, sessionKey), 'addClientHeadshot')
            .then((json) => {
                dispatch(receivedAddClientHeadshot());
                dispatch(addSuccessMessage('Successfully Added Client Headshot'));
                dispatch(getClientHeadshots(displayName));
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
                dispatch(receivedAddClientHeadshot());
            });
    };
}

export function removeClientHeadshot(clientHeadshotId, displayName) {
    const sessionKey = GetSessionKey();
    return (dispatch) => {
        dispatch(requestRemoveClientHeadshot());
        return ApiRequest(deleteRequest(GetUidApiUrl(API_ENDPOINTS.CLIENT_HEADSHOT, clientHeadshotId), sessionKey), 'removeClientHeadshot')
            .then((json) => {
                dispatch(receivedRemoveClientHeadshot());
                dispatch(addSuccessMessage('Successfully Removed Client Headshot'));
                dispatch(getClientHeadshots(displayName));
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
                dispatch(receivedRemoveClientHeadshot());
            });
    };
}

export function enableClientHeadshotEditing() {
    return (dispatch) => {
        dispatch(enableEditingclientHeadshots());
    };
}

export function disableClientHeadshotEditing() {
    return (dispatch) => {
        dispatch(disableEditingclientHeadshots());
    };
}
