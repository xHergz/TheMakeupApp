import { createReducerObject } from '../../Common/helpers/reducerUtilities';

const ONLINE_ARTIST_ACTIONS = {
    REQUEST_SEARCH_ONLINE_ARTISTS: 'REQUEST_SEARCH_ONLINE_ARTISTS',
    RECEIVED_SEARCH_ONLINE_ARTISTS: 'RECEIVED_SEARCH_ONLINE_ARTISTS',
    REQUEST_SET_ARTIST_ONLINE: 'REQUEST_SET_ARTIST_ONLINE',
    RECEIVED_SET_ARTIST_ONLINE: 'RECEIVED_SET_ARTIST_ONLINE',
    REQUEST_SET_ARTIST_OFFLINE: 'REQUEST_SET_ARTIST_OFFLINE',
    RECEIVED_SET_ARTIST_OFFLINE: 'RECEIVED_SET_ARTIST_OFFLINE'
};

const initialState = {
    currentOnlineArtistSearchResults: [],
    fetchingSearchOnlineArtists: false,
    fetchingSetArtistOnline: false,
    fetchingSetArtistOffline: false
};

export default function onlineArtistReducer(state = initialState, action) {
    switch (action.type) {
        case ONLINE_ARTIST_ACTIONS.REQUEST_SEARCH_ONLINE_ARTISTS: {
            return {
                ...state,
                fetchingSearchOnlineArtists: true
            };
        }
        case ONLINE_ARTIST_ACTIONS.RECEIVED_SEARCH_ONLINE_ARTISTS: {
            return {
                ...state,
                currentOnlineArtistSearchResults: action.payload === null ? [] : action.payload,
                fetchingSearchOnlineArtists: false
            };
        }
        case ONLINE_ARTIST_ACTIONS.REQUEST_SET_ARTIST_ONLINE: {
            return {
                ...state,
                fetchingSetArtistOnline: true
            };
        }
        case ONLINE_ARTIST_ACTIONS.RECEIVED_SET_ARTIST_ONLINE: {
            return {
                ...state,
                fetchingSetArtistOnline: false
            };
        }
        case ONLINE_ARTIST_ACTIONS.REQUEST_SET_ARTIST_OFFLINE: {
            return {
                ...state,
                fetchingSetArtistOnline: true
            };
        }
        case ONLINE_ARTIST_ACTIONS.RECEIVED_SET_ARTIST_OFFLINE: {
            return {
                ...state,
                fetchingSetArtistOnline: false
            };
        }
        default:
            return state;
    }
}

export function requestSearchOnlineArtists() {
    return createReducerObject(ONLINE_ARTIST_ACTIONS.REQUEST_SEARCH_ONLINE_ARTISTS);
}

export function receivedSearchOnlineArtists(results) {
    return createReducerObject(ONLINE_ARTIST_ACTIONS.RECEIVED_SEARCH_ONLINE_ARTISTS, results);
}

export function requestSetArtistOnline() {
    return createReducerObject(ONLINE_ARTIST_ACTIONS.REQUEST_SET_ARTIST_ONLINE);
}

export function receivedSetArtistOnline() {
    return createReducerObject(ONLINE_ARTIST_ACTIONS.RECEIVED_SET_ARTIST_ONLINE);
}

export function requestSetArtistOffline() {
    return createReducerObject(ONLINE_ARTIST_ACTIONS.REQUEST_SET_ARTIST_OFFLINE);
}

export function receivedSetArtistOffline() {
    return createReducerObject(ONLINE_ARTIST_ACTIONS.RECEIVED_SET_ARTIST_OFFLINE);
}
