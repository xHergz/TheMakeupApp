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
    requestArtistMakeoversOffered,
    receivedArtistMakeoversOffered,
    requestMakeoverTypes,
    receivedMakeoverTypes,
    requestAddArtistMakeoverOffered,
    receivedAddArtistMakeoverOffered,
    requestDeleteArtistMakeoverOffered,
    receivedDeleteArtistMakeoverOffered,
    enableEditingArtistMakeoversOffered,
    disableEditingArtistMakeoversOffered
} from '../reducers/ArtistMakeoverOfferedReducer';
import {
    addErrorMessage,
    addSuccessMessage
} from './MessageActions';

export function getArtistMakesoversOffered(displayName) {
    const sessionKey = GetSessionKey();
    return (dispatch) => {
        dispatch(requestArtistMakeoversOffered());
        return ApiRequest(getRequest(GetUidApiUrl(API_ENDPOINTS.ARTIST_MAKEOVER_OFFERED, displayName), sessionKey), 'getArtistMakesoversOffered')
            .then((json) => {
                dispatch(receivedArtistMakeoversOffered(json.artistMakeoversOffered));
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
                dispatch(receivedArtistMakeoversOffered([]));
            });
    };
}

export function getMakeoverTypes() {
    const sessionKey = GetSessionKey();
    return (dispatch) => {
        dispatch(requestMakeoverTypes());
        return ApiRequest(getRequest(GetApiUrl(API_ENDPOINTS.MAKEOVER_TYPES), sessionKey), 'getMakeoverTypes')
            .then((json) => {
                dispatch(receivedMakeoverTypes(json.makeoverTypes));
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
                dispatch(receivedMakeoverTypes([]));
            });
    };
}

export function addArtistMakeoverOffered(artistPortfolioId, makeoverTypeId, displayName) {
    const sessionKey = GetSessionKey();
    const data = {
        artistPortfolioId,
        makeoverTypeId
    };
    return (dispatch) => {
        dispatch(requestAddArtistMakeoverOffered());
        return ApiRequest(putRequest(GetApiUrl(API_ENDPOINTS.ARTIST_MAKEOVER_OFFERED), data, sessionKey), 'addArtistMakeoverOffered')
            .then((json) => {
                dispatch(receivedAddArtistMakeoverOffered());
                dispatch(addSuccessMessage('Successfully Added Artist Makeover Offered'));
                dispatch(getArtistMakesoversOffered(displayName));
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
                dispatch(receivedAddArtistMakeoverOffered());
            });
    };
}

export function deleteArtistMakeoverOffered(artistMakeoverOfferedId, displayName) {
    const sessionKey = GetSessionKey();
    return (dispatch) => {
        dispatch(requestDeleteArtistMakeoverOffered());
        return ApiRequest(deleteRequest(GetUidApiUrl(API_ENDPOINTS.ARTIST_MAKEOVER_OFFERED, artistMakeoverOfferedId), sessionKey), 'deleteArtistMakeoverOffered')
            .then((json) => {
                dispatch(receivedDeleteArtistMakeoverOffered());
                dispatch(addSuccessMessage('Successfully Removed Artist Makeover Offered'));
                dispatch(getArtistMakesoversOffered(displayName));
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
                dispatch(receivedDeleteArtistMakeoverOffered());
            });
    };
}

export function enableArtistMakeoversOfferedEditing() {
    return (dispatch) => {
        dispatch(enableEditingArtistMakeoversOffered());
    };
}

export function disableArtistMakeoversOfferedEditing() {
    return (dispatch) => {
        dispatch(disableEditingArtistMakeoversOffered());
    };
}
