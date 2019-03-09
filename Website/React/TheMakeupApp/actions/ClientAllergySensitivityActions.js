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
    const sessionKey = GetSessionKey();
    const queryData = {
        displayName
    };
    return (dispatch) => {
        dispatch(requestClientAllergiesAndSensitivities());
        return ApiRequest(getRequest(GetQueryApiUrl(API_ENDPOINTS.CLIENT_ALLERGY_SENSITIVITY, queryData), sessionKey), 'getClientAllergiesAndSensitivities')
            .then((json) => {
                dispatch(receivedClientAllergiesAndSensitivities(json.clientAllergiesAndSensitivities));
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
                dispatch(receivedClientAllergiesAndSensitivities([]));
            });
    };
}

export function getAllergiesAndSensitivities(displayName) {
    const sessionKey = GetSessionKey();
    const queryData = {
        displayName
    };
    return (dispatch) => {
        dispatch(requestAllergiesAndSensitivities());
        return ApiRequest(getRequest(GetQueryApiUrl(API_ENDPOINTS.ALLERGY_SENSITIVITY, queryData), sessionKey), 'getAllergiesAndSensitivities')
            .then((json) => {
                dispatch(receivedAllergiesAndSensitivities(json.allergiesAndSensitivities));
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
                dispatch(receivedAllergiesAndSensitivities([]));
            });
    };
}

export function addClientAllergySensitivity(clientProfileId, allergySensitivityId, displayName) {
    const sessionKey = GetSessionKey();
    const clientAllergySensitivityData = {
        clientProfileId,
        allergySensitivityId
    };
    return (dispatch) => {
        dispatch(requestAddClientAllergySensitivity());
        return ApiRequest(putRequest(GetApiUrl(API_ENDPOINTS.CLIENT_ALLERGY_SENSITIVITY), clientAllergySensitivityData, sessionKey), 'addClientAllergySensitivity')
            .then((json) => {
                dispatch(receivedAddClientAllergySensitivity());
                dispatch(addSuccessMessage('Successfully Added Client Allergy Sensitivity'));
                dispatch(getClientAllergiesAndSensitivities(displayName));
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
                dispatch(receivedAddClientAllergySensitivity());
            });
    };
}

export function removeClientAllergySensitivity(clientProfileId, allergySensitivityId, displayName) {
    const sessionKey = GetSessionKey();
    const clientAllergySensitivityData = {
        clientProfileId,
        allergySensitivityId
    };
    return (dispatch) => {
        dispatch(requestRemoveClientAllergySensitivity());
        return ApiRequest(deleteRequest(GetQueryApiUrl(API_ENDPOINTS.CLIENT_ALLERGY_SENSITIVITY, clientAllergySensitivityData), sessionKey), 'removeClientAllergySensitivity')
            .then((json) => {
                dispatch(receivedRemoveClientAllergySensitivity());
                dispatch(addSuccessMessage('Successfully Removed Client Allergy Sensitivity'));
                dispatch(getClientAllergiesAndSensitivities(displayName));
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
                dispatch(receivedRemoveClientAllergySensitivity());
            });
    };
}

export function addCustomAllergySensitivity(clientProfileId, description, displayName) {
    const sessionKey = GetSessionKey();
    const allergySensitivityData = {
        clientProfileId,
        description
    };
    return (dispatch) => {
        dispatch(requestAddCustomAllergySensitivity());
        return ApiRequest(putRequest(GetApiUrl(API_ENDPOINTS.ALLERGY_SENSITIVITY), allergySensitivityData, sessionKey), 'addCustomAllergySensitivity')
            .then((json) => {
                dispatch(receivedAddCustomAllergySensitivity());
                dispatch(addSuccessMessage('Successfully Added Custom Allergy Sensitivity'));
                dispatch(getAllergiesAndSensitivities(displayName));
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
                dispatch(receivedAddCustomAllergySensitivity());
            });
    };
}

export function enableClientAllergySensitivityEditing() {
    return (dispatch) => {
        dispatch(enableEditingClientAllergiesAndSensitivities());
    };
}

export function disableClientAllergySensitivityEditing() {
    return (dispatch) => {
        dispatch(disableEditingClientAllergiesAndSensitivities());
    };
}
