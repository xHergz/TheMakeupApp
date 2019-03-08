import {
    getRequest,
    deleteRequest,
    putRequest
} from '../../Common/helpers/fetchUtilities';

import {
    API_ENDPOINTS,
    GetSessionKey,
    GetApiUrl,
    GetQueryApiUrl
} from '../constants/ApiInfo';
import ApiRequest from '../constants/ApiRequest';
import {
    requestClientProductPreferences,
    receivedClientProductPreferences,
    requestProductPreferences,
    receivedProductPreferences,
    requestAddClientProductPreference,
    receivedAddClientProductPreference,
    requestRemoveClientProductPreference,
    receivedRemoveClientProductPreference,
    requestAddCustomProductPreference,
    receivedAddCustomProductPreference,
    enableEditingClientProductPreferences,
    disableEditingClientProductPreferences
} from '../reducers/ClientProductPreferenceReducer';
import {
    addErrorMessage,
    addSuccessMessage
} from './MessageActions';

export function getClientProductPreferences(displayName) {

}

export function getProductPreferences(displayName) {

}

export function addClientProductPreference(clientProfileId, productPreferenceId) {

}

export function removeClientProductPreference(clientProfileId, productPreferenceId) {

}

export function addCustomProductPreference(clientProfileId, description) {

}

export function enableClientProductPreferenceEditing() {

}

export function disableClientProductPreferenceEditing() {

}
