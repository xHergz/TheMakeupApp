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
    requestArtistServices,
    receivedArtistServices,
    requestServiceTypes,
    receivedServiceTypes,
    requestAddArtistService,
    receivedAddArtistService,
    requestDeleteArtistService,
    receivedDeleteArtistService,
    enableEditingArtistServices,
    disableEditingArtistServices
} from '../reducers/ArtistServiceReducer';
import {
    addErrorMessage,
    addSuccessMessage
} from './MessageActions';

export function getArtistServices(displayName) {
    const sessionKey = GetSessionKey();
    return (dispatch) => {
        dispatch(requestArtistServices());
        return ApiRequest(getRequest(GetUidApiUrl(API_ENDPOINTS.ARTIST_SERVICE, displayName), sessionKey), 'getArtistServices')
            .then((json) => {
                dispatch(receivedArtistServices(json.artistServices));
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
                dispatch(receivedArtistServices([]));
            });
    };
}

export function getServiceTypes() {
    const sessionKey = GetSessionKey();
    return (dispatch) => {
        dispatch(requestServiceTypes());
        return ApiRequest(getRequest(GetApiUrl(API_ENDPOINTS.SERVICE_TYPES), sessionKey), 'getServiceTypes')
            .then((json) => {
                dispatch(receivedServiceTypes(json.serviceTypes));
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
                dispatch(receivedServiceTypes([]));
            });
    };
}

export function addArtistService(artistMakeoverOffered, serviceTypeId, price, displayName) {
    const sessionKey = GetSessionKey();
    const data = {
        artistMakeoverOffered,
        serviceTypeId,
        price
    };
    return (dispatch) => {
        dispatch(requestAddArtistService());
        return ApiRequest(putRequest(GetApiUrl(API_ENDPOINTS.ARTIST_SERVICE), data, sessionKey), 'addArtistService')
            .then((json) => {
                dispatch(receivedAddArtistService());
                dispatch(addSuccessMessage('Successfully Added Artist Service Service'));
                dispatch(getArtistServices(displayName));
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
                dispatch(receivedAddArtistService());
            });
    };
}

export function deleteArtistService(artistMakeoverOffered, displayName) {
    const sessionKey = GetSessionKey();
    return (dispatch) => {
        dispatch(requestDeleteArtistService());
        return ApiRequest(deleteRequest(GetUidApiUrl(API_ENDPOINTS.ARTIST_SERVICE, artistMakeoverOffered), sessionKey), 'deleteArtistService')
            .then((json) => {
                dispatch(receivedDeleteArtistService());
                dispatch(addSuccessMessage('Successfully Removed Artist Service Service'));
                dispatch(getArtistServices(displayName));
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
                dispatch(receivedDeleteArtistService());
            });
    };
}

export function enableArtistServicesEditing() {
    return (dispatch) => {
        dispatch(enableEditingArtistServices());
    };
}

export function disableArtistServicesEditing() {
    return (dispatch) => {
        dispatch(disableEditingArtistServices());
    };
}
