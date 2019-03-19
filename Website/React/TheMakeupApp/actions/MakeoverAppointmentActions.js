import { createQueryString } from '../../Common/helpers/browserUtilities';
import {
    getRequest,
    putRequest
} from '../../Common/helpers/fetchUtilities';

import {
    API_ENDPOINTS,
    GetSessionKey,
    GetUidApiUrl,
    GetQueryApiUrl,
    GetApiUrl
} from '../constants/ApiInfo';
import PAGES from '../constants/Pages';
import ApiRequest from '../constants/ApiRequest';
import {
    requestMakeoverAppointment,
    receivedMakeoverAppointment,
    requestMakeoverAppointmentAddons,
    receivedMakeoverAppointmentAddons,
    requestMakeoverAppointments,
    receivedMakeoverAppointments
} from '../reducers/MakeoverAppointmentReducer';
import {
    makeoverAppointmentFormSubmitted,
    requestCreateMakeoverAppointment,
    receivedCreateMakeoverAppointment
} from '../reducers/SetupMakeoverAppointmentReducer';
import {
    addErrorMessage,
    addSuccessMessage
} from './MessageActions';

export function goToMakeoverAppointmentSetup(artistPortfolioId, artistDisplayName, makeoverTypeId, makeoverTypeDescription, serviceTypeId,
    serviceTypeDescription, servicePrice, artistServiceId) {
    const formData = {
        artistPortfolioId,
        artistDisplayName,
        makeoverTypeId,
        makeoverTypeDescription,
        serviceTypeId,
        serviceTypeDescription,
        servicePrice,
        artistServiceId
    };
    return (dispatch) => {
        window.location.href = `${PAGES.APPOINTMENT_SETUP.LINK}?${createQueryString(formData)}`;
    };
}

export function createMakeoverAppointment(clientProfileId, artistPortfolioId, consultationTypeId, consultationPrice, serviceTypeId,
    servicePrice, makeoverTypeId, appointmentDate, addons) {
    const sessionKey = GetSessionKey();
    const queryData = {
        clientProfileId,
        artistPortfolioId,
        consultationTypeId,
        consultationPrice,
        serviceTypeId,
        servicePrice,
        makeoverTypeId,
        appointmentDate,
        addons
    };
    return (dispatch) => {
        dispatch(requestCreateMakeoverAppointment());
        return ApiRequest(putRequest(GetApiUrl(API_ENDPOINTS.MAKEOVER_APPOINTMENT), queryData, sessionKey), 'createMakeoverAppointment')
            .then((json) => {
                dispatch(receivedCreateMakeoverAppointment());
                dispatch(addSuccessMessage('Successfully Created Makeover Appointment'));
                dispatch(makeoverAppointmentFormSubmitted());
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
                dispatch(receivedCreateMakeoverAppointment());
            });
    };
}

export function getMakeoverAppointment(makeoverAppointmentId) {
    const sessionKey = GetSessionKey();
    return (dispatch) => {
        dispatch(requestMakeoverAppointment());
        return ApiRequest(getRequest(GetUidApiUrl(API_ENDPOINTS.MAKEOVER_APPOINTMENT, makeoverAppointmentId), sessionKey), 'getMakeoverAppointment')
            .then((json) => {
                dispatch(receivedMakeoverAppointment(json.makeoverAppointment));
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
                dispatch(receivedMakeoverAppointment(null));
            });
    };
}

export function getMakeoverAppointments(clientProfileId, artistPortfolioId) {
    const sessionKey = GetSessionKey();
    const queryData = {
        clientProfileId,
        artistPortfolioId
    };
    return (dispatch) => {
        dispatch(requestMakeoverAppointments());
        return ApiRequest(getRequest(GetQueryApiUrl(API_ENDPOINTS.MAKEOVER_APPOINTMENT, queryData), sessionKey), 'getMakeoverAppointments')
            .then((json) => {
                dispatch(receivedMakeoverAppointments(json.makeoverAppointments));
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
                dispatch(receivedMakeoverAppointments([]));
            });
    };
}

export function getMakeoverAppointmentAddons(makeoverAppointmentId) {
    const sessionKey = GetSessionKey();
    const queryData = {
        makeoverAppointmentId
    };
    return (dispatch) => {
        dispatch(requestMakeoverAppointmentAddons());
        return ApiRequest(getRequest(GetQueryApiUrl(API_ENDPOINTS.MAKEOVER_APPOINTMENT_ADDON, queryData), sessionKey), 'getMakeoverAppointmentAddons')
            .then((json) => {
                dispatch(receivedMakeoverAppointmentAddons(json.makeoverAppointmentAddons));
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
                dispatch(receivedMakeoverAppointmentAddons([]));
            });
    };
}
