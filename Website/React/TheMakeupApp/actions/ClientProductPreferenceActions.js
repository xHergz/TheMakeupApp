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
    const sessionKey = GetSessionKey();
    const queryData = {
        displayName
    };
    return (dispatch) => {
        dispatch(requestClientProductPreferences());
        return ApiRequest(getRequest(GetQueryApiUrl(API_ENDPOINTS.CLIENT_PRODUCT_PREFERENCE, queryData), sessionKey), 'getClientProductPreferences')
            .then((json) => {
                dispatch(receivedClientProductPreferences(json.clientProductPreferences));
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
                dispatch(receivedClientProductPreferences([]));
            });
    };
}

export function getProductPreferences(displayName) {
    const sessionKey = GetSessionKey();
    const queryData = {
        displayName
    };
    return (dispatch) => {
        dispatch(requestProductPreferences());
        return ApiRequest(getRequest(GetQueryApiUrl(API_ENDPOINTS.PRODUCT_PREFERENCE, queryData), sessionKey), 'getProductPreferences')
            .then((json) => {
                dispatch(receivedProductPreferences(json.productPreferences));
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
                dispatch(receivedProductPreferences([]));
            });
    };
}

export function addClientProductPreference(clientProfileId, productPreferenceId, displayName) {
    const sessionKey = GetSessionKey();
    const clientProductPreferenceData = {
        clientProfileId,
        productPreferenceId
    };
    return (dispatch) => {
        dispatch(requestAddClientProductPreference());
        return ApiRequest(putRequest(GetApiUrl(API_ENDPOINTS.CLIENT_PRODUCT_PREFERENCE), clientProductPreferenceData, sessionKey), 'addClientProductPreference')
            .then((json) => {
                dispatch(receivedAddClientProductPreference());
                dispatch(addSuccessMessage('Successfully Added Client Preference'));
                dispatch(getClientProductPreferences(displayName));
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
                dispatch(receivedAddClientProductPreference());
            });
    };
}

export function removeClientProductPreference(clientProfileId, productPreferenceId, displayName) {
    const sessionKey = GetSessionKey();
    const clientProductPreferenceData = {
        clientProfileId,
        productPreferenceId
    };
    return (dispatch) => {
        dispatch(requestRemoveClientProductPreference());
        return ApiRequest(deleteRequest(GetQueryApiUrl(API_ENDPOINTS.CLIENT_PRODUCT_PREFERENCE, clientProductPreferenceData), sessionKey), 'removeClientProductPreference')
            .then((json) => {
                dispatch(receivedRemoveClientProductPreference());
                dispatch(addSuccessMessage('Successfully Removed Client Product Preference'));
                dispatch(getClientProductPreferences(displayName));
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
                dispatch(receivedRemoveClientProductPreference());
            });
    };
}

export function addCustomProductPreference(clientProfileId, description, displayName) {
    const sessionKey = GetSessionKey();
    const productPreferenceData = {
        clientProfileId,
        description
    };
    return (dispatch) => {
        dispatch(requestAddCustomProductPreference());
        return ApiRequest(putRequest(GetApiUrl(API_ENDPOINTS.PRODUCT_PREFERENCE), productPreferenceData, sessionKey), 'addCustomProductPreference')
            .then((json) => {
                dispatch(receivedAddCustomProductPreference());
                dispatch(addSuccessMessage('Successfully Added Custom Product Preference'));
                dispatch(getProductPreferences(displayName));
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
                dispatch(receivedAddCustomProductPreference());
            });
    };
}

export function enableClientProductPreferenceEditing() {
    return (dispatch) => {
        dispatch(enableEditingClientProductPreferences());
    };
}

export function disableClientProductPreferenceEditing() {
    return (dispatch) => {
        dispatch(disableEditingClientProductPreferences());
    };
}
