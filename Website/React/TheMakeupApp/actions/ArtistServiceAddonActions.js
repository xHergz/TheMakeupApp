import {
    getRequest,
    deleteRequest,
    putRequest
} from '../../Common/helpers/fetchUtilities';

import {
    API_ENDPOINTS,
    GetSessionKey,
    GetApiUrl,
    GetUidApiUrl
} from '../constants/ApiInfo';
import ApiRequest from '../constants/ApiRequest';
import {
    requestArtistServiceAddons,
    receivedArtistServiceAddons,
    requestAddArtistServiceAddon,
    receivedAddArtistServiceAddon,
    requestDeleteArtistServiceAddon,
    receivedDeleteArtistServiceAddon,
    enableEditingArtistServiceAddons,
    disableEditingArtistServiceAddons
} from '../reducers/ArtistServiceAddonReducer';
import {
    addErrorMessage,
    addSuccessMessage
} from './MessageActions';

export function getArtistServiceAddons(displayName) {
    const sessionKey = GetSessionKey();
    return (dispatch) => {
        dispatch(requestArtistServiceAddons());
        return ApiRequest(getRequest(GetUidApiUrl(API_ENDPOINTS.ARTIST_SERVICE_ADDON, displayName), sessionKey), 'getArtistServiceAddons')
            .then((json) => {
                dispatch(receivedArtistServiceAddons(json.artistServiceAddons));
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
                dispatch(receivedArtistServiceAddons([]));
            });
    };
}

export function addArtistServiceAddon(artistServiceId, description, price, displayName) {
    const sessionKey = GetSessionKey();
    const data = {
        artistServiceId,
        description,
        price
    };
    console.log(data);
    return (dispatch) => {
        dispatch(requestAddArtistServiceAddon());
        return ApiRequest(putRequest(GetApiUrl(API_ENDPOINTS.ARTIST_SERVICE_ADDON), data, sessionKey), 'addArtistServiceAddon')
            .then((json) => {
                dispatch(receivedAddArtistServiceAddon());
                dispatch(addSuccessMessage('Successfully Added Artist Service Addon'));
                dispatch(getArtistServiceAddons(displayName));
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
                dispatch(receivedAddArtistServiceAddon());
            });
    };
}

export function deleteArtistServiceAddon(artistServiceAddonId, displayName) {
    const sessionKey = GetSessionKey();
    return (dispatch) => {
        dispatch(requestDeleteArtistServiceAddon());
        return ApiRequest(deleteRequest(GetUidApiUrl(API_ENDPOINTS.ARTIST_SERVICE_ADDON, artistServiceAddonId), sessionKey), 'deleteArtistServiceAddon')
            .then((json) => {
                dispatch(receivedDeleteArtistServiceAddon());
                dispatch(addSuccessMessage('Successfully Removed Artist Service Addon'));
                dispatch(getArtistServiceAddons(displayName));
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
                dispatch(receivedDeleteArtistServiceAddon());
            });
    };
}

export function enableArtistServiceAddonEditing() {
    return (dispatch) => {
        dispatch(enableEditingArtistServiceAddons());
    };
}

export function disableArtistServiceAddonEditing() {
    return (dispatch) => {
        dispatch(disableEditingArtistServiceAddons());
    };
}
