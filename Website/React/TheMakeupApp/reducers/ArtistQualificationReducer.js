import { createReducerObject } from '../../Common/helpers/reducerUtilities';

const ARTIST_QUALIFICATION_ACTIONS = {
    REQUEST_ARTIST_QUALIFICATION: 'REQUEST_ARTIST_QUALIFICATION',
    RECEIVED_ARTIST_QUALIFICATION: 'RECEIVED_ARTIST_QUALIFICATION',
    REQUEST_ADD_ARTIST_QUALIFICATION: 'REQUEST_ADD_ARTIST_QUALIFICATION',
    RECEIVED_ADD_ARTIST_QUALIFICATION: 'RECEIVED_ADD_ARTIST_QUALIFICATION',
    REQUEST_DELETE_ARTIST_QUALIFICATION: 'REQUEST_DELETE_ARTIST_QUALIFICATION',
    RECEIVED_DELETE_ARTIST_QUALIFICATION: 'RECEIVED_DELETE_ARTIST_QUALIFICATION',
    ENABLED_EDITING_ARTIST_QUALIFICATION: 'ENABLED_EDITING_ARTIST_QUALIFICATION',
    DISABLE_EDITING_ARTIST_QUALIFICATION: 'DISABLE_EDITING_ARTIST_QUALIFICATION'
};

const initialState = {
    artistQualifications: [],
    fetchingArtistQualifications: false,
    fetchingAddArtistQualification: false,
    fetchingDeleteArtistQualification: false,
    editingArtistQualifications: false
};

export default function artistQualificationReducer(state = initialState, action) {
    switch (action.type) {
        case ARTIST_QUALIFICATION_ACTIONS.REQUEST_ARTIST_QUALIFICATION: {
            return {
                ...state,
                fetchingArtistQualifications: true
            };
        }
        case ARTIST_QUALIFICATION_ACTIONS.RECEIVED_ARTIST_QUALIFICATION: {
            return {
                ...state,
                fetchingArtistQualifications: false,
                artistQualifications: action.payload
            };
        }
        case ARTIST_QUALIFICATION_ACTIONS.REQUEST_ADD_ARTIST_QUALIFICATION: {
            return {
                ...state,
                fetchingAddArtistQualification: true
            };
        }
        case ARTIST_QUALIFICATION_ACTIONS.RECEIVED_ADD_ARTIST_QUALIFICATION: {
            return {
                ...state,
                fetchingAddArtistQualification: false
            };
        }
        case ARTIST_QUALIFICATION_ACTIONS.REQUEST_DELETE_ARTIST_QUALIFICATION: {
            return {
                ...state,
                fetchingDeleteArtistQualification: true
            };
        }
        case ARTIST_QUALIFICATION_ACTIONS.RECEIVED_DELETE_ARTIST_QUALIFICATION: {
            return {
                ...state,
                fetchingDeleteArtistQualification: false
            };
        }
        case ARTIST_QUALIFICATION_ACTIONS.ENABLED_EDITING_ARTIST_QUALIFICATION: {
            return {
                ...state,
                editingArtistQualifications: true
            };
        }
        case ARTIST_QUALIFICATION_ACTIONS.DISABLE_EDITING_ARTIST_QUALIFICATION: {
            return {
                ...state,
                editingArtistQualifications: false
            };
        }
        default:
            return state;
    }
}

export function requestArtistQualifications() {
    return createReducerObject(ARTIST_QUALIFICATION_ACTIONS.REQUEST_ARTIST_QUALIFICATION);
}

export function receivedArtistQualifications(artistQualifications) {
    return createReducerObject(ARTIST_QUALIFICATION_ACTIONS.RECEIVED_ARTIST_QUALIFICATION, artistQualifications);
}

export function requestAddArtistQualification() {
    return createReducerObject(ARTIST_QUALIFICATION_ACTIONS.REQUEST_ADD_ARTIST_QUALIFICATION);
}

export function receivedAddArtistQualification() {
    return createReducerObject(ARTIST_QUALIFICATION_ACTIONS.RECEIVED_ADD_ARTIST_QUALIFICATION);
}

export function requestDeleteArtistQualification() {
    return createReducerObject(ARTIST_QUALIFICATION_ACTIONS.REQUEST_DELETE_ARTIST_QUALIFICATION);
}

export function receivedDeleteArtistQualification() {
    return createReducerObject(ARTIST_QUALIFICATION_ACTIONS.RECEIVED_DELETE_ARTIST_QUALIFICATION);
}

export function enableEditingArtistQualifications() {
    return createReducerObject(ARTIST_QUALIFICATION_ACTIONS.ENABLED_EDITING_ARTIST_QUALIFICATION);
}

export function disableEditingArtistQualifications() {
    return createReducerObject(ARTIST_QUALIFICATION_ACTIONS.DISABLE_EDITING_ARTIST_QUALIFICATION);
}
