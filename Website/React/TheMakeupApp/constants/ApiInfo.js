import {
    createQueryString,
    getCookie
} from '../../Common/helpers/browserUtilities';

const API_URL = 'http://api.themakeupapp.localhost';

const SESSION_KEY_COOKIE = 'tma_session_key';

export const API_ENDPOINTS = {
    ALLERGY_SENSITIVITY: 'allergy-sensitivity',
    ARTIST_APPLICATION: 'artist-application',
    ARTIST_MAKEOVER_OFFERED: 'artist-makeover-offered',
    ARTIST_PORTFOLIO: 'artist-portfolio',
    ARTIST_PORTFOLIO_PICTURE: 'artist-portfolio-picture',
    ARTIST_QUALIFICATION: 'artist-qualification',
    ARTIST_SERVICE_ADDON: 'artist-service-addon',
    ARTIST_SERVICE_CONSULTATION: 'artist-service-consultation',
    ARTIST_SERVICE: 'artist-service',
    CLIENT_ALLERGY_SENSITIVITY: 'client-allergy-sensitivity',
    CLIENT_HEADSHOT: 'client-headshot',
    CLIENT_PRODUCT_PREFERENCE: 'client-product-preference',
    CLIENT_PROFILE: 'client-profile',
    CLIENT_REVIEWS: 'client-reviews',
    CONSULTATION_TYPES: 'consultation-types',
    EYE_COLOURS: 'eye-colours',
    HAIR_COLOURS: 'hair-colours',
    MAKEOVER_TYPES: 'makeover-types',
    NOTIFICATION: 'notifications',
    PRODUCT_PREFERENCE: 'product-preference',
    SANITIZATION_QUIZ: 'sanitization-quiz',
    SESSION: 'session',
    SERVICE_TYPES: 'service-types',
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
