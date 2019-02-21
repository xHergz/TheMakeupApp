import {
    createQueryString,
    getCookie
} from '../../Common/helpers/browserUtilities';

const API_URL = 'http://api.themakeupapp.localhost';

const SESSION_KEY_COOKIE = 'tma_session_key';

export const API_ENDPOINTS = {
    NOTIFICATION: 'notifications',
    SESSION: 'session'
};

export function GetSessionKey() {
    return getCookie(SESSION_KEY_COOKIE);
}

export function GetApiUrl(endpoint) {
    return `${API_URL}/${endpoint}`;
}

export function GetUidApiUrl(endpoint, uid) {
    return `${API_URL}/${endpoint}/${uid}`;
}

export function GetQueryApiUrl(endpoint, queryStringData) {
    return `${API_URL}/${endpoint}?${createQueryString(queryStringData)}`;
}
