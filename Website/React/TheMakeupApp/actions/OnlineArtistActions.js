import {
    getRequest,
    putRequest,
    deleteRequest
} from '../../Common/helpers/fetchUtilities';

import {
    API_ENDPOINTS,
    GetSessionKey,
    GetQueryApiUrl,
    GetApiUrl
} from '../constants/ApiInfo';
import ApiRequest from '../constants/ApiRequest';
import {
    requestSearchOnlineArtists,
    receivedSearchOnlineArtists,
    requestSetArtistOnline,
    receivedSetArtistOnline,
    requestSetArtistOffline,
    receivedSetArtistOffline
} from '../reducers/OnlineArtistReducer';
import { addErrorMessage } from './MessageActions';
import { getSessionInfo } from './SessionActions';

export function searchForArtists(makeoverTypeId, serviceTypeId, longitude, latitude, maxDistance) {
    const sessionKey = GetSessionKey();
    const queryData = {
        makeoverTypeId,
        serviceTypeId,
        longitude,
        latitude,
        maxDistance
    };
    return (dispatch) => {
        dispatch(requestSearchOnlineArtists());
        return ApiRequest(getRequest(GetQueryApiUrl(API_ENDPOINTS.ONLINE_ARTIST, queryData), sessionKey), 'searchForArtists')
            .then((json) => {
                dispatch(receivedSearchOnlineArtists(json.searchResults));
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
                dispatch(receivedSearchOnlineArtists([]));
            });
    };
}

export function setArtistOnline(artistPortfolioId, longitude, latitude) {
    const sessionKey = GetSessionKey();
    const queryData = {
        artistPortfolioId,
        longitude,
        latitude
    };
    return (dispatch) => {
        dispatch(requestSetArtistOnline());
        return ApiRequest(putRequest(GetApiUrl(API_ENDPOINTS.ONLINE_ARTIST), queryData, sessionKey), 'setArtistOnline')
            .then((json) => {
                dispatch(receivedSetArtistOnline());
                dispatch(getSessionInfo());
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
                dispatch(receivedSetArtistOnline());
            });
    };
}

export function setArtistOffline(artistPortfolioId) {
    const sessionKey = GetSessionKey();
    const queryData = {
        artistPortfolioId
    };
    return (dispatch) => {
        dispatch(requestSetArtistOffline());
        return ApiRequest(deleteRequest(GetQueryApiUrl(API_ENDPOINTS.ONLINE_ARTIST, queryData), sessionKey), 'setArtistOffline')
            .then((json) => {
                dispatch(receivedSetArtistOffline());
                dispatch(getSessionInfo());
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
                dispatch(receivedSetArtistOffline());
            });
    };
}