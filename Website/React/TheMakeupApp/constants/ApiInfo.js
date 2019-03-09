import {
    createQueryString,
    getCookie
} from '../../Common/helpers/browserUtilities';

const API_URL = 'http://api.themakeupapp.localhost';

const SESSION_KEY_COOKIE = 'tma_session_key';

export const API_ENDPOINTS = {
    ALLERGY_SENSITIVITY: 'allergy-sensitivity',
    CLIENT_ALLERGY_SENSITIVITY: 'client-allergy-sensitivity',
    CLIENT_HEADSHOT: 'client-headshot',
    CLIENT_PRODUCT_PREFERENCE: 'client-product-preference',
    CLIENT_PROFILE: 'client-profile',
    CLIENT_REVIEWS: 'client-reviews',
    EYE_COLOURS: 'eye-colours',
    HAIR_COLOURS: 'hair-colours',
    NOTIFICATION: 'notifications',
    PRODUCT_PREFERENCE: 'product-preference',
    SESSION: 'session',
    SKIN_TONES: 'skin-tones',
    USER: 'user'
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
