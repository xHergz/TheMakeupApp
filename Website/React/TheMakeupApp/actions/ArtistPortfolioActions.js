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
    requestArtistPortfolio,
    receivedArtistPortfolio,
    requestCreateArtistPortfolio,
    receivedCreateArtistPortfolio,
    requestUpdateArtistPortfolio,
    receivedUpdateArtistPortfolio,
    enableEditingArtistPortfolio,
    disableEditingArtistPortfolio
} from '../reducers/ArtistPortfolioReducer';
import {
    addErrorMessage,
    addSuccessMessage
} from './MessageActions';

export function getArtistPortfolio(displayName) {
    const sessionKey = GetSessionKey();
    return (dispatch) => {
        dispatch(requestArtistPortfolio());
        return ApiRequest(getRequest(GetUidApiUrl(API_ENDPOINTS.ARTIST_PORTFOLIO, displayName), sessionKey), 'getArtistPortfolio')
            .then((json) => {
                dispatch(receivedArtistPortfolio(json.artistPortfolio));
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
                dispatch(receivedArtistPortfolio(null));
            });
    };
}

export function createArtistPortfolio(userId, profilePicture, biography, displayName) {
    const sessionKey = GetSessionKey();
    const data = {
        userId,
        profilePicture,
        biography
    };
    return (dispatch) => {
        dispatch(requestCreateArtistPortfolio());
        return ApiRequest(putRequest(GetApiUrl(API_ENDPOINTS.ARTIST_PORTFOLIO), data, sessionKey), 'createArtistPortfolio')
            .then((json) => {
                dispatch(receivedCreateArtistPortfolio());
                dispatch(addSuccessMessage('Successfully Created Artist Portfolio'));
                dispatch(getArtistPortfolio(displayName));
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
                dispatch(receivedCreateArtistPortfolio());
            });
    };
}

export function updateArtistPortfolio(artistPortfolioId, profilePicture, biography, displayName) {
    const sessionKey = GetSessionKey();
    const data = {
        profilePicture,
        biography
    };
    return (dispatch) => {
        dispatch(requestUpdateArtistPortfolio());
        return ApiRequest(postRequest(GetUidApiUrl(API_ENDPOINTS.ARTIST_PORTFOLIO, artistPortfolioId), data, sessionKey), 'updateArtistPortfolio')
            .then((json) => {
                dispatch(receivedUpdateArtistPortfolio());
                dispatch(disableEditingArtistPortfolio());
                dispatch(addSuccessMessage('Successfully Updated Artist Portfolio'));
                dispatch(getArtistPortfolio(displayName));
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
                dispatch(receivedUpdateArtistPortfolio());
            });
    };
}

export function enableArtistPortfolioEditing() {
    return (dispatch) => {
        dispatch(enableEditingArtistPortfolio());
    };
}

export function disableArtistPortfolioEditing() {
    return (dispatch) => {
        dispatch(disableEditingArtistPortfolio());
    };
}
