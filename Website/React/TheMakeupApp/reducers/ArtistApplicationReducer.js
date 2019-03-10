import { createReducerObject } from '../../Common/helpers/reducerUtilities';

const ARTIST_APPLICATION_ACTIONS = {
    REQUEST_CREATE_ARTIST_APPLICATION: 'REQUEST_CREATE_ARTIST_APPLICATION',
    RECEIVED_CREATE_ARTIST_APPLICATION: 'RECEIVED_CREATE_ARTIST_APPLICATION',
    ARTIST_APPLICATION_SUBMITTED: 'ARTIST_APPLICATION_SUBMITTED'
};

const initialState = {
    fetchingCreateArtistApplication: false,
    artistApplicationSubmitted: false
};

export default function artistApplicationReducer(state = initialState, action) {
    switch (action.type) {
        case ARTIST_APPLICATION_ACTIONS.REQUEST_CREATE_ARTIST_APPLICATION: {
            return {
                ...state,
                fetchingCreateArtistApplication: true
            };
        }
        case ARTIST_APPLICATION_ACTIONS.RECEIVED_CREATE_ARTIST_APPLICATION: {
            return {
                ...state,
                fetchingCreateArtistApplication: false
            };
        }
        case ARTIST_APPLICATION_ACTIONS.ARTIST_APPLICATION_SUBMITTED: {
            return {
                ...state,
                artistApplicationSubmitted: true
            };
        }
        default:
            return state;
    }
}

export function requestCreateArtistApplication() {
    return createReducerObject(ARTIST_APPLICATION_ACTIONS.REQUEST_CREATE_ARTIST_APPLICATION);
}

export function receivedCreateArtistApplication() {
    return createReducerObject(ARTIST_APPLICATION_ACTIONS.RECEIVED_CREATE_ARTIST_APPLICATION);
}

export function artistApplicationSubmitted() {
    return createReducerObject(ARTIST_APPLICATION_ACTIONS.ARTIST_APPLICATION_SUBMITTED);
}
