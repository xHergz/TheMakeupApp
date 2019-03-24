import {
    getRequest,
    putRequest
} from '../../Common/helpers/fetchUtilities';

import {
    API_ENDPOINTS,
    GetSessionKey,
    GetUidApiUrl,
    GetApiUrl
} from '../constants/ApiInfo';
import ApiRequest from '../constants/ApiRequest';
import PAGES from '../constants/Pages';
import {
    addRoom,
    setAudio,
    setBridge,
    setUser,
    setVideo,
    requestConsultation,
    receivedConsultation,
    requestCreateConsultation,
    receivedCreateConsultation
} from '../reducers/ConsultationReducer';
import {
    addErrorMessage,
    addSuccessMessage
} from './MessageActions';

export function addConsultationRoom(room) {
    return (dispatch) => {
        dispatch(addRoom(room));
    };
}

export function setConsultationAudio(audio) {
    return (dispatch) => {
        dispatch(setAudio(audio));
    };
}

export function setConsultationBridge(bridge) {
    return (dispatch) => {
        dispatch(setBridge(bridge));
    };
}

export function setConsultationUser(user) {
    return (dispatch) => {
        dispatch(setUser(user));
    };
}

export function setConsultationVideo(video) {
    return (dispatch) => {
        dispatch(setVideo(video));
    };
}

export function createConsultation(clientProfileId, artistPortfolioId) {
    const sessionKey = GetSessionKey();
    const queryData = {
        clientProfileId,
        artistPortfolioId
    };
    return (dispatch) => {
        dispatch(requestCreateConsultation());
        return ApiRequest(putRequest(GetApiUrl(API_ENDPOINTS.CONSULTATION), queryData, sessionKey), 'createConsultation')
            .then((json) => {
                dispatch(receivedCreateConsultation());
                dispatch(addSuccessMessage('Successfully Created Makeover Appointment'));
                window.location.href = `/consultation/${json.newConsultationId}`;
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
                dispatch(receivedCreateConsultation());
            });
    };
}

export function getConsultation(consultationId) {
    const sessionKey = GetSessionKey();
    return (dispatch) => {
        dispatch(requestConsultation());
        return ApiRequest(getRequest(GetUidApiUrl(API_ENDPOINTS.CONSULTATION, consultationId), sessionKey), 'getConsultation')
            .then((json) => {
                dispatch(receivedConsultation(json.consultation));
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
                dispatch(receivedConsultation(null));
            });
    };
}
