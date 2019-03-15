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
    requestArtistPortfolioPictures,
    receivedArtistPortfolioPictures,
    requestAddArtistPortfolioPicture,
    receivedAddArtistPortfolioPicture,
    requestDeleteArtistPortfolioPicture,
    receivedDeleteArtistPortfolioPicture,
    enableEditingArtistPortfolioPictures,
    disableEditingArtistPortfolioPictures
} from '../reducers/ArtistPortfolioPictureReducer';
import {
    addErrorMessage,
    addSuccessMessage
} from './MessageActions';

export function getArtistPortfolioPictures(displayName) {
    const sessionKey = GetSessionKey();
    return (dispatch) => {
        dispatch(requestArtistPortfolioPictures());
        return ApiRequest(getRequest(GetUidApiUrl(API_ENDPOINTS.ARTIST_PORTFOLIO_PICTURE, displayName), sessionKey), 'getArtistPortfolioPictures')
            .then((json) => {
                dispatch(receivedArtistPortfolioPictures(json.artistPortfolioPictures));
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
                dispatch(receivedArtistPortfolioPictures([]));
            });
    };
}

export function addArtistPortfolioPicture(artistPortfolioId, image, makeoverTypeId, displayName) {
    const sessionKey = GetSessionKey();
    const data = {
        artistPortfolioId,
        image,
        makeoverTypeId
    };
    return (dispatch) => {
        dispatch(requestAddArtistPortfolioPicture());
        return ApiRequest(putRequest(GetApiUrl(API_ENDPOINTS.ARTIST_PORTFOLIO_PICTURE), data, sessionKey), 'addArtistPortfolioPicture')
            .then((json) => {
                dispatch(receivedAddArtistPortfolioPicture());
                dispatch(addSuccessMessage('Successfully Added Artist Portfolio Picture'));
                dispatch(getArtistPortfolioPictures(displayName));
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
                dispatch(receivedAddArtistPortfolioPicture());
            });
    };
}

export function deleteArtistPortfolioPicture(artistPortfolioPictureId, displayName) {
    const sessionKey = GetSessionKey();
    return (dispatch) => {
        dispatch(requestDeleteArtistPortfolioPicture());
        return ApiRequest(deleteRequest(GetUidApiUrl(API_ENDPOINTS.ARTIST_PORTFOLIO_PICTURE, artistPortfolioPictureId), sessionKey), 'deleteArtistPortfolioPicture')
            .then((json) => {
                dispatch(receivedDeleteArtistPortfolioPicture());
                dispatch(addSuccessMessage('Successfully Removed Artist Portfolio Picture'));
                dispatch(getArtistPortfolioPictures(displayName));
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
                dispatch(receivedDeleteArtistPortfolioPicture());
            });
    };
}

export function enableArtistPortfolioPictureEditing() {
    return (dispatch) => {
        dispatch(enableEditingArtistPortfolioPictures());
    };
}

export function disableArtistPortfolioPictureEditing() {
    return (dispatch) => {
        dispatch(disableEditingArtistPortfolioPictures());
    };
}
