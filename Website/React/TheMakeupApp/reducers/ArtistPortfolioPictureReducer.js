import { createReducerObject } from '../../Common/helpers/reducerUtilities';

const ARTIST_PORTFOLIO_PICTURE_ACTIONS = {
    REQUEST_ARTIST_PORTFOLIO_PICTURES: 'REQUEST_ARTIST_PORTFOLIO_PICTURES',
    RECEIVED_ARTIST_PORTFOLIO_PICTURES: 'RECEIVED_ARTIST_PORTFOLIO_PICTURES',
    REQUEST_ADD_ARTIST_PORTFOLIO_PICTURE: 'REQUEST_ADD_ARTIST_PORTFOLIO_PICTURE',
    RECEIVED_ADD_ARTIST_PORTFOLIO_PICTURE: 'RECEIVED_ADD_ARTIST_PORTFOLIO_PICTURE',
    REQUEST_DELETE_ARTIST_PORTFOLIO_PICTURE: 'REQUEST_DELETE_ARTIST_PORTFOLIO_PICTURE',
    RECEIVED_DELETE_ARTIST_PORTFOLIO_PICTURE: 'RECEIVED_DELETE_ARTIST_PORTFOLIO_PICTURE',
    ENABLED_EDITING_ARTIST_PORTFOLIO_PICTURES: 'ENABLED_EDITING_ARTIST_PORTFOLIO_PICTURES',
    DISABLE_EDITING_ARTIST_PORTFOLIO_PICTURES: 'DISABLE_EDITING_ARTIST_PORTFOLIO_PICTURES'
};

const initialState = {
    artistPortfolioPictures: [],
    fetchingArtistPortfolioPictures: false,
    fetchingAddArtistPortfolioPicture: false,
    fetchingDeleteArtistPortfolioPicture: false,
    editingArtistPortfolioPictures: false
};

export default function artistPortfolioPictureReducer(state = initialState, action) {
    switch (action.type) {
        case ARTIST_PORTFOLIO_PICTURE_ACTIONS.REQUEST_ARTIST_PORTFOLIO_PICTURES: {
            return {
                ...state,
                fetchingArtistPortfolioPictures: true
            };
        }
        case ARTIST_PORTFOLIO_PICTURE_ACTIONS.RECEIVED_ARTIST_PORTFOLIO_PICTURES: {
            return {
                ...state,
                fetchingArtistPortfolioPictures: false,
                artistPortfolioPictures: action.payload === null ? [] : action.payload
            };
        }
        case ARTIST_PORTFOLIO_PICTURE_ACTIONS.REQUEST_ADD_ARTIST_PORTFOLIO_PICTURE: {
            return {
                ...state,
                fetchingAddArtistPortfolioPicture: true
            };
        }
        case ARTIST_PORTFOLIO_PICTURE_ACTIONS.RECEIVED_ADD_ARTIST_PORTFOLIO_PICTURE: {
            return {
                ...state,
                fetchingAddArtistPortfolioPicture: false
            };
        }
        case ARTIST_PORTFOLIO_PICTURE_ACTIONS.REQUEST_DELETE_ARTIST_PORTFOLIO_PICTURE: {
            return {
                ...state,
                fetchingDeleteArtistPortfolioPicture: true
            };
        }
        case ARTIST_PORTFOLIO_PICTURE_ACTIONS.RECEIVED_DELETE_ARTIST_PORTFOLIO_PICTURE: {
            return {
                ...state,
                fetchingDeleteArtistPortfolioPicture: false
            };
        }
        case ARTIST_PORTFOLIO_PICTURE_ACTIONS.ENABLED_EDITING_ARTIST_PORTFOLIO_PICTURES: {
            return {
                ...state,
                editingArtistPortfolioPictures: true
            };
        }
        case ARTIST_PORTFOLIO_PICTURE_ACTIONS.DISABLE_EDITING_ARTIST_PORTFOLIO_PICTURES: {
            return {
                ...state,
                editingArtistPortfolioPictures: false
            };
        }
        default:
            return state;
    }
}

export function requestArtistPortfolioPictures() {
    return createReducerObject(ARTIST_PORTFOLIO_PICTURE_ACTIONS.REQUEST_ARTIST_PORTFOLIO_PICTURES);
}

export function receivedArtistPortfolioPictures(artistPortfolioPictures) {
    return createReducerObject(ARTIST_PORTFOLIO_PICTURE_ACTIONS.RECEIVED_ARTIST_PORTFOLIO_PICTURES, artistPortfolioPictures);
}

export function requestAddArtistPortfolioPicture() {
    return createReducerObject(ARTIST_PORTFOLIO_PICTURE_ACTIONS.REQUEST_ADD_ARTIST_PORTFOLIO_PICTURE);
}

export function receivedAddArtistPortfolioPicture() {
    return createReducerObject(ARTIST_PORTFOLIO_PICTURE_ACTIONS.RECEIVED_ADD_ARTIST_PORTFOLIO_PICTURE);
}

export function requestDeleteArtistPortfolioPicture() {
    return createReducerObject(ARTIST_PORTFOLIO_PICTURE_ACTIONS.REQUEST_DELETE_ARTIST_PORTFOLIO_PICTURE);
}

export function receivedDeleteArtistPortfolioPicture() {
    return createReducerObject(ARTIST_PORTFOLIO_PICTURE_ACTIONS.RECEIVED_DELETE_ARTIST_PORTFOLIO_PICTURE);
}

export function enableEditingArtistPortfolioPictures() {
    return createReducerObject(ARTIST_PORTFOLIO_PICTURE_ACTIONS.ENABLED_EDITING_ARTIST_PORTFOLIO_PICTURES);
}

export function disableEditingArtistPortfolioPictures() {
    return createReducerObject(ARTIST_PORTFOLIO_PICTURE_ACTIONS.DISABLE_EDITING_ARTIST_PORTFOLIO_PICTURES);
}
