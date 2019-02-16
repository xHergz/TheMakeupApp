import { createQueryString } from '../../Common/helpers/browserUtilities';

const API_URL = 'http://api.themakeupapp.localhost';

export const API_ENDPOINTS = {
    SESSION: 'session'
};

export function GetApiUrl(endpoint) {
    return `${API_URL}/${endpoint}`;
}

export function GetUidApiUrl(endpoint, uid) {
    return `${API_URL}/${endpoint}/${uid}`;
}

export function GetQueryApiUrl(endpoint, queryStringData) {
    return `${API_URL}/${endpoint}?${createQueryString(queryStringData)}`;
}
