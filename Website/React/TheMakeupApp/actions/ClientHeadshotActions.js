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

}

export function addClientHeadshot(clientProfileId, picture, headshotTypeId) {

}

export function removeClientHeadshot(clientHeadshotId) {

}

export function enableClientHeadshotEditing() {

}

export function disableClientHeadshotEditing() {

}
