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
    requestArtistQualifications,
    receivedArtistQualifications,
    requestAddArtistQualification,
    receivedAddArtistQualification,
    requestDeleteArtistQualification,
    receivedDeleteArtistQualification,
    enableEditingArtistQualifications,
    disableEditingArtistQualifications
} from '../reducers/ArtistQualificationReducer';
import {
    addErrorMessage,
    addSuccessMessage
} from './MessageActions';

export function getArtistQualifications(displayName) {
    const sessionKey = GetSessionKey();
    return (dispatch) => {
        dispatch(requestArtistQualifications());
        return ApiRequest(getRequest(GetUidApiUrl(API_ENDPOINTS.ARTIST_QUALIFICATION, displayName), sessionKey), 'getArtistQualifications')
            .then((json) => {
                dispatch(receivedArtistQualifications(json.artistQualifications));
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
                dispatch(receivedArtistQualifications([]));
            });
    };
}

export function addArtistQualification(artistPortfolioId, yearObtained, description, displayName) {
    const sessionKey = GetSessionKey();
    const data = {
        artistPortfolioId,
        yearObtained,
        description
    };
    return (dispatch) => {
        dispatch(requestAddArtistQualification());
        return ApiRequest(putRequest(GetApiUrl(API_ENDPOINTS.ARTIST_QUALIFICATION), data, sessionKey), 'addArtistQualification')
            .then((json) => {
                dispatch(receivedAddArtistQualification());
                dispatch(addSuccessMessage('Successfully Added Artist Qualification'));
                dispatch(getArtistQualifications(displayName));
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
                dispatch(receivedAddArtistQualification());
            });
    };
}

export function deleteArtistQualification(artistQualificationId, displayName) {
    const sessionKey = GetSessionKey();
    return (dispatch) => {
        dispatch(requestDeleteArtistQualification());
        return ApiRequest(deleteRequest(GetUidApiUrl(API_ENDPOINTS.ARTIST_QUALIFICATION, artistQualificationId), sessionKey), 'deleteArtistQualification')
            .then((json) => {
                dispatch(receivedDeleteArtistQualification());
                dispatch(addSuccessMessage('Successfully Removed Artist Qualification'));
                dispatch(getArtistQualifications(displayName));
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
                dispatch(receivedDeleteArtistQualification());
            });
    };
}

export function enableArtistQualificationEditing() {
    return (dispatch) => {
        dispatch(enableEditingArtistQualifications());
    };
}

export function disableArtistQualificationEditing() {
    return (dispatch) => {
        dispatch(disableEditingArtistQualifications());
    };
}
