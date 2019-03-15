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
    requestArtistServiceConsultations,
    receivedArtistServiceConsultations,
    requestConsultationTypes,
    receivedConsultationTypes,
    requestAddArtistServiceConsultation,
    receivedAddArtistServiceConsultation,
    requestDeleteArtistServiceConsultation,
    receivedDeleteArtistServiceConsultation,
    enableEditingArtistServiceConsultations,
    disableEditingArtistServiceConsultations
} from '../reducers/ArtistServiceConsultationReducer';
import {
    addErrorMessage,
    addSuccessMessage
} from './MessageActions';

export function getArtistServiceConsultations(displayName) {
    const sessionKey = GetSessionKey();
    return (dispatch) => {
        dispatch(requestArtistServiceConsultations());
        return ApiRequest(getRequest(GetUidApiUrl(API_ENDPOINTS.ARTIST_SERVICE_CONSULTATION, displayName), sessionKey), 'getArtistServiceConsultations')
            .then((json) => {
                dispatch(receivedArtistServiceConsultations(json.artistServiceConsultations));
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
                dispatch(receivedArtistServiceConsultations([]));
            });
    };
}

export function getConsultationTypes() {
    const sessionKey = GetSessionKey();
    return (dispatch) => {
        dispatch(requestConsultationTypes());
        return ApiRequest(getRequest(GetApiUrl(API_ENDPOINTS.CONSULTATION_TYPES), sessionKey), 'getConsultationTypes')
            .then((json) => {
                dispatch(receivedConsultationTypes(json.consultationTypes));
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
                dispatch(receivedConsultationTypes([]));
            });
    };
}

export function addArtistServiceConsultation(artistServiceId, consultationTypeId, price, displayName) {
    const sessionKey = GetSessionKey();
    const data = {
        artistServiceId,
        consultationTypeId,
        price
    };
    return (dispatch) => {
        dispatch(requestAddArtistServiceConsultation());
        return ApiRequest(putRequest(GetApiUrl(API_ENDPOINTS.ARTIST_SERVICE_CONSULTATION), data, sessionKey), 'addArtistServiceConsultation')
            .then((json) => {
                dispatch(receivedAddArtistServiceConsultation());
                dispatch(addSuccessMessage('Successfully Added Artist Service Consultation'));
                dispatch(getArtistServiceConsultations(displayName));
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
                dispatch(receivedAddArtistServiceConsultation());
            });
    };
}

export function deleteArtistServiceConsultation(artistServiceConsultationId, displayName) {
    const sessionKey = GetSessionKey();
    return (dispatch) => {
        dispatch(requestDeleteArtistServiceConsultation());
        return ApiRequest(deleteRequest(GetUidApiUrl(API_ENDPOINTS.ARTIST_SERVICE_CONSULTATION, artistServiceConsultationId), sessionKey), 'deleteArtistServiceConsultation')
            .then((json) => {
                dispatch(receivedDeleteArtistServiceConsultation());
                dispatch(addSuccessMessage('Successfully Removed Artist Service Consultation'));
                dispatch(getArtistServiceConsultations(displayName));
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
                dispatch(receivedDeleteArtistServiceConsultation());
            });
    };
}

export function enableArtistServiceConsultationsEditing() {
    return (dispatch) => {
        dispatch(enableEditingArtistServiceConsultations());
    };
}

export function disableArtistServiceConsultationsEditing() {
    return (dispatch) => {
        dispatch(disableEditingArtistServiceConsultations());
    };
}
