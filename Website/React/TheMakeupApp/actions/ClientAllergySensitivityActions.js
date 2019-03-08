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
    requestClientAllergiesAndSensitivities,
    receivedClientAllergiesAndSensitivities,
    requestAllergiesAndSensitivities,
    receivedAllergiesAndSensitivities,
    requestAddClientAllergySensitivity,
    receivedAddClientAllergySensitivity,
    requestRemoveClientAllergySensitivity,
    receivedRemoveClientAllergySensitivity,
    requestAddCustomAllergySensitivity,
    receivedAddCustomAllergySensitivity,
    enableEditingClientAllergiesAndSensitivities,
    disableEditingClientAllergiesAndSensitivities
} from '../reducers/ClientAllergySensitivityReducer';
import {
    addErrorMessage,
    addSuccessMessage
} from './MessageActions';

export function getClientAllergiesAndSensitivities(displayName) {

}

export function getAllergiesAndSensitivities(displayName) {

}

export function addClientAllergySensitivity(clientProfileId, allergySensitivityId) {

}

export function removeClientAllergySensitivity(clientProfileId, allergySensitivityId) {

}

export function addCustomAllergySensitivity(clientProfileId, description) {

}

export function enableClientAllergySensitivityEditing() {

}

export function disableClientAllergySensitivityEditing() {

}
