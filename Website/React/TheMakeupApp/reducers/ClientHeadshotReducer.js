import { createReducerObject } from '../../Common/helpers/reducerUtilities';

const CLIENT_HEADSHOT_ACTIONS = {
    REQUEST_CLIENT_HEADSHOTS: 'REQUEST_CLIENT_HEADSHOTS',
    RECEIVED_CLIENT_HEADSHOTS: 'RECEIVED_CLIENT_HEADSHOTS',
    REQUEST_ADD_CLIENT_HEADSHOT: 'REQUEST_ADD_CLIENT_HEADSHOT',
    RECEIVED_ADD_CLIENT_HEADSHOT: 'RECEIVED_ADD_CLIENT_HEADSHOT',
    REQUEST_REMOVE_CLIENT_HEADSHOT: 'REQUEST_REMOVE_CLIENT_HEADSHOT',
    RECEIVED_REMOVE_CLIENT_HEADSHOT: 'RECEIVED_REMOVE_CLIENT_HEADSHOT',
    ENABLED_EDITING_CLIENT_HEADSHOTS: 'ENABLED_EDITING_CLIENT_HEADSHOTS',
    DISABLED_EDIITING_CLIENT_HEADSHOTS: 'DISABLED_EDIITING_CLIENT_HEADSHOTS'
};

const initialState = {
    clientHeadshots: [],
    fetchingClientHeadshots: false,
    fetchingAddClientHeadshot: false,
    fetchingRemoveClientHeadshot: false,
    editingClientHeadshots: false
};

export default function clientHeadshotReducer(state = initialState, action) {
    switch (action.type) {
        case CLIENT_HEADSHOT_ACTIONS.REQUEST_CLIENT_HEADSHOTS: {
            return {
                ...state,
                fetchingClientHeadshots: true
            };
        }
        case CLIENT_HEADSHOT_ACTIONS.RECEIVED_CLIENT_HEADSHOTS: {
            return {
                ...state,
                fetchingClientHeadshots: false,
                clientHeadshots: action.payload
            };
        }
        case CLIENT_HEADSHOT_ACTIONS.REQUEST_ADD_CLIENT_HEADSHOT: {
            return {
                ...state,
                fetchingAddClientHeadshot: true
            };
        }
        case CLIENT_HEADSHOT_ACTIONS.RECEIVED_ADD_CLIENT_HEADSHOT: {
            return {
                ...state,
                fetchingAddClientHeadshot: false
            };
        }
        case CLIENT_HEADSHOT_ACTIONS.REQUEST_REMOVE_CLIENT_HEADSHOT: {
            return {
                ...state,
                fetchingRemoveClientHeadshot: true
            };
        }
        case CLIENT_HEADSHOT_ACTIONS.RECEIVED_REMOVE_CLIENT_HEADSHOT: {
            return {
                ...state,
                fetchingRemoveClientHeadshot: false
            };
        }
        case CLIENT_HEADSHOT_ACTIONS.ENABLED_EDITING_CLIENT_HEADSHOTS: {
            return {
                ...state,
                editingClientHeadshots: true
            };
        }
        case CLIENT_HEADSHOT_ACTIONS.DISABLED_EDIITING_CLIENT_HEADSHOTS: {
            return {
                ...state,
                editingClientHeadshots: false
            };
        }
        default:
            return state;
    }
}

export function requestClientHeadshots() {
    return createReducerObject(CLIENT_HEADSHOT_ACTIONS.REQUEST_CLIENT_HEADSHOTS);
}

export function receivedClientHeadshots(clientHeadshots) {
    return createReducerObject(CLIENT_HEADSHOT_ACTIONS.RECEIVED_CLIENT_HEADSHOTS, clientHeadshots);
}

export function requestAddClientHeadshot() {
    return createReducerObject(CLIENT_HEADSHOT_ACTIONS.REQUEST_ADD_CLIENT_HEADSHOT);
}

export function receivedAddClientHeadshot() {
    return createReducerObject(CLIENT_HEADSHOT_ACTIONS.RECEIVED_ADD_CLIENT_HEADSHOT);
}

export function requestRemoveClientHeadshot() {
    return createReducerObject(CLIENT_HEADSHOT_ACTIONS.REQUEST_REMOVE_CLIENT_HEADSHOT);
}

export function receivedRemoveClientHeadshot() {
    return createReducerObject(CLIENT_HEADSHOT_ACTIONS.RECEIVED_REMOVE_CLIENT_HEADSHOT);
}

export function enableEditingclientHeadshots() {
    return createReducerObject(CLIENT_HEADSHOT_ACTIONS.ENABLED_EDITING_CLIENT_HEADSHOTS);
}

export function disableEditingclientHeadshots() {
    return createReducerObject(CLIENT_HEADSHOT_ACTIONS.DISABLED_EDIITING_CLIENT_HEADSHOTS);
}
