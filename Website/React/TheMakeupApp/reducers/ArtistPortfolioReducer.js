import { createReducerObject } from '../../Common/helpers/reducerUtilities';

const ARTIST_PORTFOLIO_ACTIONS = {
    REQUEST_ARTIST_PORTFOLIO: 'REQUEST_ARTIST_PORTFOLIO',
    RECEIVED_ARTIST_PORTFOLIO: 'RECEIVED_ARTIST_PORTFOLIO',
    REQUEST_ARTIST_PORTFOLIOS: 'REQUEST_ARTIST_PORTFOLIOS',
    RECEIVED_ARTIST_PORTFOLIOS: 'RECEIVED_ARTIST_PORTFOLIOS',
    REQUEST_CREATE_ARTIST_PORTFOLIO: 'REQUEST_CREATE_ARTIST_PORTFOLIO',
    RECEIVED_CREATE_ARTIST_PORTFOLIO: 'RECEIVED_CREATE_ARTIST_PORTFOLIO',
    REQUEST_UPDATE_ARTIST_PORTFOLIO: 'REQUEST_UPDATE_ARTIST_PORTFOLIO',
    RECEIVED_UPDATE_ARTIST_PORTFOLIO: 'RECEIVED_UPDATE_ARTIST_PORTFOLIO',
    ENABLED_EDITING_ARTIST_PORTFOLIO: 'ENABLED_EDITING_ARTIST_PORTFOLIO',
    DISABLE_EDITING_ARTIST_PORTFOLIO: 'DISABLE_EDITING_ARTIST_PORTFOLIO'
};

const initialState = {
    currentArtistPortfolio: null,
    artistPortfolios: [],
    fetchingArtistPortfolio: false,
    fetchingArtistPortfolios: false,
    fetchingCreateArtistPortfolio: false,
    fetchingUpdateArtistPortfolio: false,
    editingArtistPortfolio: false
};

export default function artistPortfolioReducer(state = initialState, action) {
    switch (action.type) {
        case ARTIST_PORTFOLIO_ACTIONS.REQUEST_ARTIST_PORTFOLIO: {
            return {
                ...state,
                fetchingArtistPortfolio: true
            };
        }
        case ARTIST_PORTFOLIO_ACTIONS.RECEIVED_ARTIST_PORTFOLIO: {
            return {
                ...state,
                fetchingArtistPortfolio: false,
                currentArtistPortfolio: action.payload
            };
        }
        case ARTIST_PORTFOLIO_ACTIONS.REQUEST_ARTIST_PORTFOLIOS: {
            return {
                ...state,
                fetchingArtistPortfolios: true
            };
        }
        case ARTIST_PORTFOLIO_ACTIONS.RECEIVED_ARTIST_PORTFOLIOS: {
            return {
                ...state,
                fetchingArtistPortfolios: false,
                artistPortfolios: action.payload === null ? [] : action.payload
            };
        }
        case ARTIST_PORTFOLIO_ACTIONS.REQUEST_CREATE_ARTIST_PORTFOLIO: {
            return {
                ...state,
                fetchingCreateArtistPortfolio: true
            };
        }
        case ARTIST_PORTFOLIO_ACTIONS.RECEIVED_CREATE_ARTIST_PORTFOLIO: {
            return {
                ...state,
                fetchingCreateArtistPortfolio: false
            };
        }
        case ARTIST_PORTFOLIO_ACTIONS.REQUEST_UPDATE_ARTIST_PORTFOLIO: {
            return {
                ...state,
                fetchingUpdateArtistPortfolio: true
            };
        }
        case ARTIST_PORTFOLIO_ACTIONS.RECEIVED_UPDATE_ARTIST_PORTFOLIO: {
            return {
                ...state,
                fetchingUpdateArtistPortfolio: false
            };
        }
        case ARTIST_PORTFOLIO_ACTIONS.ENABLED_EDITING_ARTIST_PORTFOLIO: {
            return {
                ...state,
                editingArtistPortfolio: true
            };
        }
        case ARTIST_PORTFOLIO_ACTIONS.DISABLE_EDITING_ARTIST_PORTFOLIO: {
            return {
                ...state,
                editingArtistPortfolio: false
            };
        }
        default:
            return state;
    }
}

export function requestArtistPortfolio() {
    return createReducerObject(ARTIST_PORTFOLIO_ACTIONS.REQUEST_ARTIST_PORTFOLIO);
}

export function receivedArtistPortfolio(artistPortfolio) {
    return createReducerObject(ARTIST_PORTFOLIO_ACTIONS.RECEIVED_ARTIST_PORTFOLIO, artistPortfolio);
}

export function requestArtistPortfolios() {
    return createReducerObject(ARTIST_PORTFOLIO_ACTIONS.REQUEST_ARTIST_PORTFOLIOS);
}

export function receivedArtistPortfolios(artistPortfolios) {
    return createReducerObject(ARTIST_PORTFOLIO_ACTIONS.RECEIVED_ARTIST_PORTFOLIOS, artistPortfolios);
}

export function requestCreateArtistPortfolio() {
    return createReducerObject(ARTIST_PORTFOLIO_ACTIONS.REQUEST_CREATE_ARTIST_PORTFOLIO);
}

export function receivedCreateArtistPortfolio() {
    return createReducerObject(ARTIST_PORTFOLIO_ACTIONS.RECEIVED_CREATE_ARTIST_PORTFOLIO);
}

export function requestUpdateArtistPortfolio() {
    return createReducerObject(ARTIST_PORTFOLIO_ACTIONS.REQUEST_UPDATE_ARTIST_PORTFOLIO);
}

export function receivedUpdateArtistPortfolio() {
    return createReducerObject(ARTIST_PORTFOLIO_ACTIONS.RECEIVED_UPDATE_ARTIST_PORTFOLIO);
}

export function enableEditingArtistPortfolio() {
    return createReducerObject(ARTIST_PORTFOLIO_ACTIONS.ENABLED_EDITING_ARTIST_PORTFOLIO);
}

export function disableEditingArtistPortfolio() {
    return createReducerObject(ARTIST_PORTFOLIO_ACTIONS.DISABLE_EDITING_ARTIST_PORTFOLIO);
}
