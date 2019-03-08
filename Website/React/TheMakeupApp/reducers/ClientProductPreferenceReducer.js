import { createReducerObject } from '../../Common/helpers/reducerUtilities';

const CLIENT_PRODUCT_PREFERENCE_ACTIONS = {
    REQUEST_CLIENT_PRODUCT_PREFERENCES: 'REQUEST_CLIENT_PRODUCT_PREFERENCES',
    RECEIVED_CLIENT_PRODUCT_PREFERENCES: 'RECEIVED_CLIENT_PRODUCT_PREFERENCES',
    REQUEST_PRODUCT_PREFERENCES: 'REQUEST_PRODUCT_PREFERENCES',
    RECEIVED_PRODUCT_PREFERENCES: 'RECEIVED_PRODUCT_PREFERENCES',
    REQUEST_ADD_CLIENT_PRODUCT_PREFERENCE: 'REQUEST_ADD_CLIENT_PRODUCT_PREFERENCE',
    RECEIVED_ADD_CLIENT_PRODUCT_PREFERENCE: 'RECEIVED_ADD_CLIENT_PRODUCT_PREFERENCE',
    REQUEST_REMOVE_CLIENT_PRODUCT_PREFERENCE: 'REQUEST_REMOVE_CLIENT_PRODUCT_PREFERENCE',
    RECEIVED_REMOVE_CLIENT_PRODUCT_PREFERENCE: 'RECEIVED_REMOVE_CLIENT_PRODUCT_PREFERENCE',
    REQUEST_ADD_CUSTOM_PRODUCT_PREFERENCE: 'REQUEST_ADD_CUSTOM_PRODUCT_PREFERENCE',
    RECEIVED_ADD_CUSTOM_PRODUCT_PREFERENCE: 'RECEIVED_ADD_CUSTOM_PRODUCT_PREFERENCE',
    ENABLED_EDITING_CLIENT_PRODUCT_PREFERENCES: 'ENABLED_EDITING_CLIENT_PRODUCT_PREFERENCES',
    DISABLED_EDIITING_CLIENT_PRODUCT_PREFERENCES: 'DISABLED_EDIITING_CLIENT_PRODUCT_PREFERENCES'
};

const initialState = {
    clientProductPreferences: [],
    productPreferences: [],
    fetchingClientProductPreferences: false,
    fetchingProductPreferences: false,
    fetchingAddClientProductPreference: false,
    fetchingRemoveClientProductPreference: false,
    fetchingAddCustomProductPreference: false,
    editingClientProductPreferences: false
};

export default function clientProductPreferenceReducer(state = initialState, action) {
    switch (action.type) {
        case CLIENT_PRODUCT_PREFERENCE_ACTIONS.REQUEST_CLIENT_PRODUCT_PREFERENCES: {
            return {
                ...state,
                fetchingClientProductPreferences: true
            };
        }
        case CLIENT_PRODUCT_PREFERENCE_ACTIONS.RECEIVED_CLIENT_PRODUCT_PREFERENCES: {
            return {
                ...state,
                fetchingClientProductPreferences: false,
                clientProductPreferences: action.payload
            };
        }
        case CLIENT_PRODUCT_PREFERENCE_ACTIONS.REQUEST_PRODUCT_PREFERENCES: {
            return {
                ...state,
                fetchingProductPreferences: true
            };
        }
        case CLIENT_PRODUCT_PREFERENCE_ACTIONS.RECEIVED_PRODUCT_PREFERENCES: {
            return {
                ...state,
                fetchingProductPreferences: false,
                productPreferences: action.payload
            };
        }
        case CLIENT_PRODUCT_PREFERENCE_ACTIONS.REQUEST_ADD_CLIENT_PRODUCT_PREFERENCE: {
            return {
                ...state,
                fetchingAddClientProductPreference: true
            };
        }
        case CLIENT_PRODUCT_PREFERENCE_ACTIONS.RECEIVED_ADD_CLIENT_PRODUCT_PREFERENCE: {
            return {
                ...state,
                fetchingAddClientProductPreference: false
            };
        }
        case CLIENT_PRODUCT_PREFERENCE_ACTIONS.REQUEST_REMOVE_CLIENT_PRODUCT_PREFERENCE: {
            return {
                ...state,
                fetchingRemoveClientProductPreference: true
            };
        }
        case CLIENT_PRODUCT_PREFERENCE_ACTIONS.RECEIVED_REMOVE_CLIENT_PRODUCT_PREFERENCE: {
            return {
                ...state,
                fetchingRemoveClientProductPreference: false
            };
        }
        case CLIENT_PRODUCT_PREFERENCE_ACTIONS.REQUEST_ADD_CUSTOM_PRODUCT_PREFERENCE: {
            return {
                ...state,
                fetchingAddCustomProductPreference: true
            };
        }
        case CLIENT_PRODUCT_PREFERENCE_ACTIONS.RECEIVED_ADD_CUSTOM_PRODUCT_PREFERENCE: {
            return {
                ...state,
                fetchingAddCustomProductPreference: false
            };
        }
        case CLIENT_PRODUCT_PREFERENCE_ACTIONS.ENABLED_EDITING_CLIENT_PRODUCT_PREFERENCES: {
            return {
                ...state,
                editingClientProductPreferences: true
            };
        }
        case CLIENT_PRODUCT_PREFERENCE_ACTIONS.DISABLED_EDIITING_CLIENT_PRODUCT_PREFERENCES: {
            return {
                ...state,
                editingClientProductPreferences: false
            };
        }
        default:
            return state;
    }
}

export function requestClientProductPreferences() {
    return createReducerObject(CLIENT_PRODUCT_PREFERENCE_ACTIONS.REQUEST_CLIENT_PRODUCT_PREFERENCES);
}

export function receivedClientProductPreferences(clientProductPreferences) {
    return createReducerObject(CLIENT_PRODUCT_PREFERENCE_ACTIONS.RECEIVED_CLIENT_PRODUCT_PREFERENCES, clientProductPreferences);
}

export function requestProductPreferences() {
    return createReducerObject(CLIENT_PRODUCT_PREFERENCE_ACTIONS.REQUEST_PRODUCT_PREFERENCES);
}

export function receivedProductPreferences(productPreferences) {
    return createReducerObject(CLIENT_PRODUCT_PREFERENCE_ACTIONS.RECEIVED_PRODUCT_PREFERENCES, productPreferences);
}

export function requestAddClientProductPreference() {
    return createReducerObject(CLIENT_PRODUCT_PREFERENCE_ACTIONS.REQUEST_ADD_CLIENT_PRODUCT_PREFERENCE);
}

export function receivedAddClientProductPreference() {
    return createReducerObject(CLIENT_PRODUCT_PREFERENCE_ACTIONS.RECEIVED_ADD_CLIENT_PRODUCT_PREFERENCE);
}

export function requestRemoveClientProductPreference() {
    return createReducerObject(CLIENT_PRODUCT_PREFERENCE_ACTIONS.REQUEST_REMOVE_CLIENT_PRODUCT_PREFERENCE);
}

export function receivedRemoveClientProductPreference() {
    return createReducerObject(CLIENT_PRODUCT_PREFERENCE_ACTIONS.RECEIVED_REMOVE_CLIENT_PRODUCT_PREFERENCE);
}

export function requestAddCustomProductPreference() {
    return createReducerObject(CLIENT_PRODUCT_PREFERENCE_ACTIONS.REQUEST_ADD_CUSTOM_PRODUCT_PREFERENCE);
}

export function receivedAddCustomProductPreference() {
    return createReducerObject(CLIENT_PRODUCT_PREFERENCE_ACTIONS.RECEIVED_ADD_CUSTOM_PRODUCT_PREFERENCE);
}

export function enableEditingClientProductPreferences() {
    return createReducerObject(CLIENT_PRODUCT_PREFERENCE_ACTIONS.ENABLED_EDITING_CLIENT_PRODUCT_PREFERENCES);
}

export function disableEditingClientProductPreferences() {
    return createReducerObject(CLIENT_PRODUCT_PREFERENCE_ACTIONS.DISABLED_EDIITING_CLIENT_PRODUCT_PREFERENCES);
}
