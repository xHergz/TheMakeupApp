import { createReducerObject } from '../../Common/helpers/reducerUtilities';

const ARTIST_SERVICE_ADDON_ACTIONS = {
    REQUEST_ARTIST_SERVICE_ADDONS: 'REQUEST_ARTIST_SERVICE_ADDONS',
    RECEIVED_ARTIST_SERVICE_ADDONS: 'RECEIVED_ARTIST_SERVICE_ADDONS',
    REQUEST_ADD_ARTIST_SERVICE_ADDON: 'REQUEST_ADD_ARTIST_SERVICE_ADDON',
    RECEIVED_ADD_ARTIST_SERVICE_ADDON: 'RECEIVED_ADD_ARTIST_SERVICE_ADDON',
    REQUEST_DELETE_ARTIST_SERVICE_ADDON: 'REQUEST_DELETE_ARTIST_SERVICE_ADDON',
    RECEIVED_DELETE_ARTIST_SERVICE_ADDON: 'RECEIVED_DELETE_ARTIST_SERVICE_ADDON',
    ENABLED_EDITING_ARTIST_SERVICE_ADDONS: 'ENABLED_EDITING_ARTIST_SERVICE_ADDONS',
    DISABLE_EDITING_ARTIST_SERVICE_ADDONS: 'DISABLE_EDITING_ARTIST_SERVICE_ADDONS'
};

const initialState = {
    artistServiceAddons: [],
    fetchingArtistServiceAddons: false,
    fetchingAddArtistServiceAddon: false,
    fetchingDeleteArtistServiceAddon: false,
    editingArtistServiceAddons: false
};

export default function artistServiceAddonReducer(state = initialState, action) {
    switch (action.type) {
        case ARTIST_SERVICE_ADDON_ACTIONS.REQUEST_ARTIST_SERVICE_ADDONS: {
            return {
                ...state,
                fetchingArtistServiceAddons: true
            };
        }
        case ARTIST_SERVICE_ADDON_ACTIONS.RECEIVED_ARTIST_SERVICE_ADDONS: {
            return {
                ...state,
                fetchingArtistServiceAddons: false,
                artistServiceAddons: action.payload
            };
        }
        case ARTIST_SERVICE_ADDON_ACTIONS.REQUEST_ADD_ARTIST_SERVICE_ADDON: {
            return {
                ...state,
                fetchingAddArtistServiceAddon: true
            };
        }
        case ARTIST_SERVICE_ADDON_ACTIONS.RECEIVED_ADD_ARTIST_SERVICE_ADDON: {
            return {
                ...state,
                fetchingAddArtistServiceAddon: false
            };
        }
        case ARTIST_SERVICE_ADDON_ACTIONS.REQUEST_DELETE_ARTIST_SERVICE_ADDON: {
            return {
                ...state,
                fetchingDeleteArtistServiceAddon: true
            };
        }
        case ARTIST_SERVICE_ADDON_ACTIONS.RECEIVED_DELETE_ARTIST_SERVICE_ADDON: {
            return {
                ...state,
                fetchingDeleteArtistServiceAddon: false
            };
        }
        case ARTIST_SERVICE_ADDON_ACTIONS.ENABLED_EDITING_ARTIST_SERVICE_ADDONS: {
            return {
                ...state,
                editingArtistServiceAddons: true
            };
        }
        case ARTIST_SERVICE_ADDON_ACTIONS.DISABLE_EDITING_ARTIST_SERVICE_ADDONS: {
            return {
                ...state,
                editingArtistServiceAddons: false
            };
        }
        default:
            return state;
    }
}

export function requestArtistServiceAddons() {
    return createReducerObject(ARTIST_SERVICE_ADDON_ACTIONS.REQUEST_ARTIST_SERVICE_ADDONS);
}

export function receivedArtistServiceAddons(artistServiceAddons) {
    return createReducerObject(ARTIST_SERVICE_ADDON_ACTIONS.RECEIVED_ARTIST_SERVICE_ADDONS, artistServiceAddons);
}

export function requestAddArtistServiceAddon() {
    return createReducerObject(ARTIST_SERVICE_ADDON_ACTIONS.REQUEST_ADD_ARTIST_SERVICE_ADDON);
}

export function receivedAddArtistServiceAddon() {
    return createReducerObject(ARTIST_SERVICE_ADDON_ACTIONS.RECEIVED_ADD_ARTIST_SERVICE_ADDON);
}

export function requestDeleteArtistServiceAddon() {
    return createReducerObject(ARTIST_SERVICE_ADDON_ACTIONS.REQUEST_DELETE_ARTIST_SERVICE_ADDON);
}

export function receivedDeleteArtistServiceAddon() {
    return createReducerObject(ARTIST_SERVICE_ADDON_ACTIONS.RECEIVED_DELETE_ARTIST_SERVICE_ADDON);
}

export function enableEditingArtistServiceAddons() {
    return createReducerObject(ARTIST_SERVICE_ADDON_ACTIONS.ENABLED_EDITING_ARTIST_SERVICE_ADDONS);
}

export function disableEditingArtistServiceAddons() {
    return createReducerObject(ARTIST_SERVICE_ADDON_ACTIONS.DISABLE_EDITING_ARTIST_SERVICE_ADDONS);
}
