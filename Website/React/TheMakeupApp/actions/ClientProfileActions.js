import {
    getRequest,
    postRequest,
    putRequest
} from '../../Common/helpers/fetchUtilities';

import {
    API_ENDPOINTS,
    GetSessionKey,
    GetUidApiUrl,
    GetApiUrl
} from '../constants/ApiInfo';
import ApiRequest from '../constants/ApiRequest';
import {
    requestClientProfile,
    receivedClientProfile,
    requestCreateClientProfile,
    receivedCreateClientProfile,
    requestUpdateClientProfile,
    receivedUpdateClientProfile,
    enableEditingClientProfile,
    disableEditingClientProfile,
    requestEyeColours,
    receivedEyeColours,
    requestHairColours,
    receivedHairColours,
    requestSkinTones,
    receivedSkinTones
} from '../reducers/ClientProfileReducer';
import {
    addErrorMessage,
    addSuccessMessage
} from './MessageActions';

export function getClientProfile(displayName) {
    const sessionKey = GetSessionKey();
    return (dispatch) => {
        dispatch(requestClientProfile());
        return ApiRequest(getRequest(GetUidApiUrl(API_ENDPOINTS.CLIENT_PROFILE, displayName), sessionKey), 'getClientProfile')
            .then((json) => {
                dispatch(receivedClientProfile(json.clientProfile));
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
                dispatch(receivedClientProfile(null));
            });
    };
}

export function createClientProfile(userId, profilePicture, biography, eyeColourId, hairColourId, skinToneId, displayName) {
    const sessionKey = GetSessionKey();
    const queryData = {
        userId,
        profilePicture,
        biography,
        eyeColourId,
        hairColourId,
        skinToneId
    };
    return (dispatch) => {
        dispatch(requestCreateClientProfile());
        return ApiRequest(putRequest(GetApiUrl(API_ENDPOINTS.CLIENT_PROFILE), queryData, sessionKey), 'createClientProfile')
            .then((json) => {
                dispatch(receivedCreateClientProfile());
                dispatch(addSuccessMessage('Successfully Created Client Profile'));
                dispatch(getClientProfile(displayName));
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
                dispatch(receivedCreateClientProfile());
            });
    };
}

export function updateClientProfile(clientProfileId, profilePicture, biography, eyeColourId, hairColourId, skinToneId, displayName) {
    const sessionKey = GetSessionKey();
    const queryData = {
        profilePicture,
        biography,
        eyeColourId,
        hairColourId,
        skinToneId
    };
    return (dispatch) => {
        dispatch(requestUpdateClientProfile());
        return ApiRequest(postRequest(GetUidApiUrl(API_ENDPOINTS.CLIENT_PROFILE, clientProfileId), queryData, sessionKey), 'updateClientProfile')
            .then((json) => {
                dispatch(receivedUpdateClientProfile());
                dispatch(disableEditingClientProfile());
                dispatch(addSuccessMessage('Successfully Updated Client Profile'));
                dispatch(getClientProfile(displayName));
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
                dispatch(receivedUpdateClientProfile());
            });
    };
}

export function enableClientProfileEditing() {
    return (dispatch) => {
        dispatch(enableEditingClientProfile());
    };
}

export function disableClientProfileEditing() {
    return (dispatch) => {
        dispatch(disableEditingClientProfile());
    };
}

export function getEyeColours() {
    const sessionKey = GetSessionKey();
    return (dispatch) => {
        dispatch(requestEyeColours());
        return ApiRequest(getRequest(GetApiUrl(API_ENDPOINTS.EYE_COLOURS), sessionKey), 'getEyeColours')
            .then((json) => {
                dispatch(receivedEyeColours(json.eyeColours));
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
                dispatch(receivedEyeColours([]));
            });
    };
}

export function getHairColours() {
    const sessionKey = GetSessionKey();
    return (dispatch) => {
        dispatch(requestHairColours());
        return ApiRequest(getRequest(GetApiUrl(API_ENDPOINTS.HAIR_COLOURS), sessionKey), 'getHairColours')
            .then((json) => {
                dispatch(receivedHairColours(json.hairColours));
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
                dispatch(receivedHairColours([]));
            });
    };
}

export function getSkinTones() {
    const sessionKey = GetSessionKey();
    return (dispatch) => {
        dispatch(requestSkinTones());
        return ApiRequest(getRequest(GetApiUrl(API_ENDPOINTS.SKIN_TONES), sessionKey), 'getSkinTones')
            .then((json) => {
                dispatch(receivedSkinTones(json.skinTones));
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
                dispatch(receivedSkinTones([]));
            });
    };
}
