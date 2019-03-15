import { createReducerObject } from '../../Common/helpers/reducerUtilities';

const ARTIST_SERVICE_ACTIONS = {
    REQUEST_ARTIST_SERVICES: 'REQUEST_ARTIST_SERVICES',
    RECEIVED_ARTIST_SERVICES: 'RECEIVED_ARTIST_SERVICES',
    REQUEST_SERVICE_TYPES: 'REQUEST_SERVICE_TYPES',
    RECEIVED_SERVICE_TYPES: 'RECEIVED_SERVICE_TYPES',
    REQUEST_ADD_ARTIST_SERVICE: 'REQUEST_ADD_ARTIST_SERVICE',
    RECEIVED_ADD_ARTIST_SERVICE: 'RECEIVED_ADD_ARTIST_SERVICE',
    REQUEST_DELETE_ARTIST_SERVICE: 'REQUEST_DELETE_ARTIST_SERVICE',
    RECEIVED_DELETE_ARTIST_SERVICE: 'RECEIVED_DELETE_ARTIST_SERVICE',
    ENABLED_EDITING_ARTIST_SERVICES: 'ENABLED_EDITING_ARTIST_SERVICES',
    DISABLE_EDITING_ARTIST_SERVICES: 'DISABLE_EDITING_ARTIST_SERVICES'
};

const initialState = {
    artistServices: [],
    serviceTypes: [],
    fetchingArtistServices: false,
    fetchingServiceTypes: false,
    fetchingAddArtistService: false,
    fetchingDeleteArtistService: false,
    editingArtistServices: false
};

export default function artistServiceReducer(state = initialState, action) {
    switch (action.type) {
        case ARTIST_SERVICE_ACTIONS.REQUEST_ARTIST_SERVICES: {
            return {
                ...state,
                fetchingArtistServices: true
            };
        }
        case ARTIST_SERVICE_ACTIONS.RECEIVED_ARTIST_SERVICES: {
            return {
                ...state,
                fetchingArtistServices: false,
                artistServices: action.payload === null ? [] : action.payload
            };
        }
        case ARTIST_SERVICE_ACTIONS.REQUEST_SERVICE_TYPES: {
            return {
                ...state,
                fetchingServiceTypes: true
            };
        }
        case ARTIST_SERVICE_ACTIONS.RECEIVED_SERVICE_TYPES: {
            return {
                ...state,
                fetchingServiceTypes: false,
                serviceTypes: action.payload === null ? [] : action.payload
            };
        }
        case ARTIST_SERVICE_ACTIONS.REQUEST_ADD_ARTIST_SERVICE: {
            return {
                ...state,
                fetchingAddArtistService: true
            };
        }
        case ARTIST_SERVICE_ACTIONS.RECEIVED_ADD_ARTIST_SERVICE: {
            return {
                ...state,
                fetchingAddArtistService: false
            };
        }
        case ARTIST_SERVICE_ACTIONS.REQUEST_DELETE_ARTIST_SERVICE: {
            return {
                ...state,
                fetchingDeleteArtistService: true
            };
        }
        case ARTIST_SERVICE_ACTIONS.RECEIVED_DELETE_ARTIST_SERVICE: {
            return {
                ...state,
                fetchingDeleteArtistService: false
            };
        }
        case ARTIST_SERVICE_ACTIONS.ENABLED_EDITING_ARTIST_SERVICES: {
            return {
                ...state,
                editingArtistServices: true
            };
        }
        case ARTIST_SERVICE_ACTIONS.DISABLE_EDITING_ARTIST_SERVICES: {
            return {
                ...state,
                editingArtistServices: false
            };
        }
        default:
            return state;
    }
}

export function requestArtistServices() {
    return createReducerObject(ARTIST_SERVICE_ACTIONS.REQUEST_ARTIST_SERVICES);
}

export function receivedArtistServices(artistServices) {
    return createReducerObject(ARTIST_SERVICE_ACTIONS.RECEIVED_ARTIST_SERVICES, artistServices);
}

export function requestServiceTypes() {
    return createReducerObject(ARTIST_SERVICE_ACTIONS.REQUEST_SERVICE_TYPES);
}

export function receivedServiceTypes(serviceTypes) {
    return createReducerObject(ARTIST_SERVICE_ACTIONS.RECEIVED_SERVICE_TYPES, serviceTypes);
}


export function requestAddArtistService() {
    return createReducerObject(ARTIST_SERVICE_ACTIONS.REQUEST_ADD_ARTIST_SERVICE);
}

export function receivedAddArtistService() {
    return createReducerObject(ARTIST_SERVICE_ACTIONS.RECEIVED_ADD_ARTIST_SERVICE);
}

export function requestDeleteArtistService() {
    return createReducerObject(ARTIST_SERVICE_ACTIONS.REQUEST_DELETE_ARTIST_SERVICE);
}

export function receivedDeleteArtistService() {
    return createReducerObject(ARTIST_SERVICE_ACTIONS.RECEIVED_DELETE_ARTIST_SERVICE);
}

export function enableEditingArtistServices() {
    return createReducerObject(ARTIST_SERVICE_ACTIONS.ENABLED_EDITING_ARTIST_SERVICES);
}

export function disableEditingArtistServices() {
    return createReducerObject(ARTIST_SERVICE_ACTIONS.DISABLE_EDITING_ARTIST_SERVICES);
}
