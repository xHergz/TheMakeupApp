import { createReducerObject } from '../../Common/helpers/reducerUtilities';

const ARTIST_MAKEOVER_OFFERED_ACTIONS = {
    REQUEST_ARTIST_MAKEOVERS_OFFERED: 'REQUEST_ARTIST_MAKEOVERS_OFFERED',
    RECEIVED_ARTIST_MAKEOVERS_OFFERED: 'RECEIVED_ARTIST_MAKEOVERS_OFFERED',
    REQUEST_MAKEOVER_TYPES: 'REQUEST_MAKEOVER_TYPES',
    RECEIVED_MAKEOVER_TYPES: 'RECEIVED_MAKEOVER_TYPES',
    REQUEST_ADD_ARTIST_MAKEOVER_OFFERED: 'REQUEST_ADD_ARTIST_MAKEOVER_OFFERED',
    RECEIVED_ADD_ARTIST_MAKEOVER_OFFERED: 'RECEIVED_ADD_ARTIST_MAKEOVER_OFFERED',
    REQUEST_DELETE_ARTIST_MAKEOVER_OFFERED: 'REQUEST_DELETE_ARTIST_MAKEOVER_OFFERED',
    RECEIVED_DELETE_ARTIST_MAKEOVER_OFFERED: 'RECEIVED_DELETE_ARTIST_MAKEOVER_OFFERED',
    ENABLED_EDITING_ARTIST_MAKEOVERS_OFFERED: 'ENABLED_EDITING_ARTIST_MAKEOVERS_OFFERED',
    DISABLE_EDITING_ARTIST_MAKEOVERS_OFFERED: 'DISABLE_EDITING_ARTIST_MAKEOVERS_OFFERED'
};

const initialState = {
    artistMakeoversOffered: [],
    makeoverTypes: [],
    fetchingArtistMakeoversOffered: false,
    fetchingMakeoverTypes: false,
    fetchingAddArtistMakeoverOffered: false,
    fetchingDeleteArtistMakeoverOffered: false,
    editingArtistMakeoversOffered: false
};

export default function artistMakeoverOfferedReducer(state = initialState, action) {
    switch (action.type) {
        case ARTIST_MAKEOVER_OFFERED_ACTIONS.REQUEST_ARTIST_MAKEOVERS_OFFERED: {
            return {
                ...state,
                fetchingArtistMakeoversOffered: true
            };
        }
        case ARTIST_MAKEOVER_OFFERED_ACTIONS.RECEIVED_ARTIST_MAKEOVERS_OFFERED: {
            return {
                ...state,
                fetchingArtistMakeoversOffered: false,
                artistMakeoversOffered: action.payload === null ? [] : action.payload
            };
        }
        case ARTIST_MAKEOVER_OFFERED_ACTIONS.REQUEST_MAKEOVER_TYPES: {
            return {
                ...state,
                fetchingMakeoverTypes: true
            };
        }
        case ARTIST_MAKEOVER_OFFERED_ACTIONS.RECEIVED_MAKEOVER_TYPES: {
            return {
                ...state,
                fetchingMakeoverTypes: false,
                makeoverTypes: action.payload === null ? [] : action.payload
            };
        }
        case ARTIST_MAKEOVER_OFFERED_ACTIONS.REQUEST_ADD_ARTIST_MAKEOVER_OFFERED: {
            return {
                ...state,
                fetchingAddArtistMakeoverOffered: true
            };
        }
        case ARTIST_MAKEOVER_OFFERED_ACTIONS.RECEIVED_ADD_ARTIST_MAKEOVER_OFFERED: {
            return {
                ...state,
                fetchingAddArtistMakeoverOffered: false
            };
        }
        case ARTIST_MAKEOVER_OFFERED_ACTIONS.REQUEST_DELETE_ARTIST_MAKEOVER_OFFERED: {
            return {
                ...state,
                fetchingDeleteArtistMakeoverOffered: true
            };
        }
        case ARTIST_MAKEOVER_OFFERED_ACTIONS.RECEIVED_DELETE_ARTIST_MAKEOVER_OFFERED: {
            return {
                ...state,
                fetchingDeleteArtistMakeoverOffered: false
            };
        }
        case ARTIST_MAKEOVER_OFFERED_ACTIONS.ENABLED_EDITING_ARTIST_MAKEOVERS_OFFERED: {
            return {
                ...state,
                editingArtistMakeoversOffered: true
            };
        }
        case ARTIST_MAKEOVER_OFFERED_ACTIONS.DISABLE_EDITING_ARTIST_MAKEOVERS_OFFERED: {
            return {
                ...state,
                editingArtistMakeoversOffered: false
            };
        }
        default:
            return state;
    }
}

export function requestArtistMakeoversOffered() {
    return createReducerObject(ARTIST_MAKEOVER_OFFERED_ACTIONS.REQUEST_ARTIST_MAKEOVERS_OFFERED);
}

export function receivedArtistMakeoversOffered(artistMakeoversOffered) {
    return createReducerObject(ARTIST_MAKEOVER_OFFERED_ACTIONS.RECEIVED_ARTIST_MAKEOVERS_OFFERED, artistMakeoversOffered);
}

export function requestMakeoverTypes() {
    return createReducerObject(ARTIST_MAKEOVER_OFFERED_ACTIONS.REQUEST_MAKEOVER_TYPES);
}

export function receivedMakeoverTypes(makeoverTypes) {
    return createReducerObject(ARTIST_MAKEOVER_OFFERED_ACTIONS.RECEIVED_MAKEOVER_TYPES, makeoverTypes);
}


export function requestAddArtistMakeoverOffered() {
    return createReducerObject(ARTIST_MAKEOVER_OFFERED_ACTIONS.REQUEST_ADD_ARTIST_MAKEOVER_OFFERED);
}

export function receivedAddArtistMakeoverOffered() {
    return createReducerObject(ARTIST_MAKEOVER_OFFERED_ACTIONS.RECEIVED_ADD_ARTIST_MAKEOVER_OFFERED);
}

export function requestDeleteArtistMakeoverOffered() {
    return createReducerObject(ARTIST_MAKEOVER_OFFERED_ACTIONS.REQUEST_DELETE_ARTIST_MAKEOVER_OFFERED);
}

export function receivedDeleteArtistMakeoverOffered() {
    return createReducerObject(ARTIST_MAKEOVER_OFFERED_ACTIONS.RECEIVED_DELETE_ARTIST_MAKEOVER_OFFERED);
}

export function enableEditingArtistMakeoversOffered() {
    return createReducerObject(ARTIST_MAKEOVER_OFFERED_ACTIONS.ENABLED_EDITING_ARTIST_MAKEOVERS_OFFERED);
}

export function disableEditingArtistMakeoversOffered() {
    return createReducerObject(ARTIST_MAKEOVER_OFFERED_ACTIONS.DISABLE_EDITING_ARTIST_MAKEOVERS_OFFERED);
}
