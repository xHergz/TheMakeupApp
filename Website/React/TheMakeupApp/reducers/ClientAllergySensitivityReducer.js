import { createReducerObject } from '../../Common/helpers/reducerUtilities';

const CLIENT_ALLERGY_SENSITIVITY_ACTIONS = {
    REQUEST_CLIENT_ALLERGIES_AND_SENSITIVITIES: 'REQUEST_CLIENT_ALLERGIES_AND_SENSITIVITIES',
    RECEIVED_CLIENT_ALLERGIES_AND_SENSITIVITIES: 'RECEIVED_CLIENT_ALLERGIES_AND_SENSITIVITIES',
    REQUEST_ALLERGIES_AND_SENSITIVITIES: 'REQUEST_ALLERGIES_AND_SENSITIVITIES',
    RECEIVED_ALLERGIES_AND_SENSITIVITIES: 'RECEIVED_ALLERGIES_AND_SENSITIVITIES',
    REQUEST_ADD_CLIENT_ALLERGY_SENSITIVITY: 'REQUEST_ADD_CLIENT_ALLERGY_SENSITIVITY',
    RECEIVED_ADD_CLIENT_ALLERGY_SENSITIVITY: 'RECEIVED_ADD_CLIENT_ALLERGY_SENSITIVITY',
    REQUEST_REMOVE_CLIENT_ALLERGY_SENSITIVITY: 'REQUEST_REMOVE_CLIENT_ALLERGY_SENSITIVITY',
    RECEIVED_REMOVE_CLIENT_ALLERGY_SENSITIVITY: 'RECEIVED_REMOVE_CLIENT_ALLERGY_SENSITIVITY',
    REQUEST_ADD_CUSTOM_ALLERGY_SENSITIVITY: 'REQUEST_ADD_CUSTOM_ALLERGY_SENSITIVITY',
    RECEIVED_ADD_CUSTOM_ALLERGY_SENSITIVITY: 'RECEIVED_ADD_CUSTOM_ALLERGY_SENSITIVITY',
    ENABLED_EDITING_CLIENT_ALLERGIES_AND_SENSITIVITIES: 'ENABLED_EDITING_CLIENT_ALLERGIES_AND_SENSITIVITIES',
    DISABLED_EDIITING_CLIENT_ALLERGIES_AND_SENSITIVITIES: 'DISABLED_EDIITING_CLIENT_ALLERGIES_AND_SENSITIVITIES'
};

const initialState = {
    clientAllergiesAndSensitivities: [],
    allergiesAndSensitivities: [],
    fetchingClientAllergiesAndSensitivities: false,
    fetchingAllergiesAndSensitivities: false,
    fetchingAddClientAllergySensitivity: false,
    fetchingRemoveClientAllergySensitivity: false,
    fetchingAddCustomAllergySensitivity: false,
    editingClientAllergiesAndSensitivities: false
};

export default function clientAllergySensitivityReducer(state = initialState, action) {
    switch (action.type) {
        case CLIENT_ALLERGY_SENSITIVITY_ACTIONS.REQUEST_CLIENT_ALLERGIES_AND_SENSITIVITIES: {
            return {
                ...state,
                fetchingClientAllergiesAndSensitivities: true
            };
        }
        case CLIENT_ALLERGY_SENSITIVITY_ACTIONS.RECEIVED_CLIENT_ALLERGIES_AND_SENSITIVITIES: {
            return {
                ...state,
                fetchingClientAllergiesAndSensitivities: false,
                clientAllergiesAndSensitivities: action.payload
            };
        }
        case CLIENT_ALLERGY_SENSITIVITY_ACTIONS.REQUEST_ALLERGIES_AND_SENSITIVITIES: {
            return {
                ...state,
                fetchingAllergiesAndSensitivities: true
            };
        }
        case CLIENT_ALLERGY_SENSITIVITY_ACTIONS.RECEIVED_ALLERGIES_AND_SENSITIVITIES: {
            return {
                ...state,
                fetchingAllergiesAndSensitivities: false,
                allergiesAndSensitivities: action.payload
            };
        }
        case CLIENT_ALLERGY_SENSITIVITY_ACTIONS.REQUEST_ADD_CLIENT_ALLERGY_SENSITIVITY: {
            return {
                ...state,
                fetchingAddClientAllergySensitivity: true
            };
        }
        case CLIENT_ALLERGY_SENSITIVITY_ACTIONS.RECEIVED_ADD_CLIENT_ALLERGY_SENSITIVITY: {
            return {
                ...state,
                fetchingAddClientAllergySensitivity: false
            };
        }
        case CLIENT_ALLERGY_SENSITIVITY_ACTIONS.REQUEST_REMOVE_CLIENT_ALLERGY_SENSITIVITY: {
            return {
                ...state,
                fetchingRemoveClientAllergySensitivity: true
            };
        }
        case CLIENT_ALLERGY_SENSITIVITY_ACTIONS.RECEIVED_REMOVE_CLIENT_ALLERGY_SENSITIVITY: {
            return {
                ...state,
                fetchingRemoveClientAllergySensitivity: false
            };
        }
        case CLIENT_ALLERGY_SENSITIVITY_ACTIONS.REQUEST_ADD_CUSTOM_ALLERGY_SENSITIVITY: {
            return {
                ...state,
                fetchingAddCustomAllergySensitivity: true
            };
        }
        case CLIENT_ALLERGY_SENSITIVITY_ACTIONS.RECEIVED_ADD_CUSTOM_ALLERGY_SENSITIVITY: {
            return {
                ...state,
                fetchingAddCustomAllergySensitivity: false
            };
        }
        case CLIENT_ALLERGY_SENSITIVITY_ACTIONS.ENABLED_EDITING_CLIENT_ALLERGIES_AND_SENSITIVITIES: {
            return {
                ...state,
                editingClientAllergiesAndSensitivities: true
            };
        }
        case CLIENT_ALLERGY_SENSITIVITY_ACTIONS.DISABLED_EDIITING_CLIENT_ALLERGIES_AND_SENSITIVITIES: {
            return {
                ...state,
                editingClientAllergiesAndSensitivities: false
            };
        }
        default:
            return state;
    }
}

export function requestClientAllergiesAndSensitivities() {
    return createReducerObject(CLIENT_ALLERGY_SENSITIVITY_ACTIONS.REQUEST_CLIENT_ALLERGIES_AND_SENSITIVITIES);
}

export function receivedClientAllergiesAndSensitivities(clientAllergiesAndSensitivities) {
    return createReducerObject(CLIENT_ALLERGY_SENSITIVITY_ACTIONS.RECEIVED_CLIENT_ALLERGIES_AND_SENSITIVITIES, clientAllergiesAndSensitivities);
}

export function requestAllergiesAndSensitivities() {
    return createReducerObject(CLIENT_ALLERGY_SENSITIVITY_ACTIONS.REQUEST_ALLERGIES_AND_SENSITIVITIES);
}

export function receivedAllergiesAndSensitivities(allergiesAndSensitivities) {
    return createReducerObject(CLIENT_ALLERGY_SENSITIVITY_ACTIONS.RECEIVED_ALLERGIES_AND_SENSITIVITIES, allergiesAndSensitivities);
}

export function requestAddClientAllergySensitivity() {
    return createReducerObject(CLIENT_ALLERGY_SENSITIVITY_ACTIONS.REQUEST_ADD_CLIENT_ALLERGY_SENSITIVITY);
}

export function receivedAddClientAllergySensitivity() {
    return createReducerObject(CLIENT_ALLERGY_SENSITIVITY_ACTIONS.RECEIVED_ADD_CLIENT_ALLERGY_SENSITIVITY);
}

export function requestRemoveClientAllergySensitivity() {
    return createReducerObject(CLIENT_ALLERGY_SENSITIVITY_ACTIONS.REQUEST_REMOVE_CLIENT_ALLERGY_SENSITIVITY);
}

export function receivedRemoveClientAllergySensitivity() {
    return createReducerObject(CLIENT_ALLERGY_SENSITIVITY_ACTIONS.RECEIVED_REMOVE_CLIENT_ALLERGY_SENSITIVITY);
}

export function requestAddCustomAllergySensitivity() {
    return createReducerObject(CLIENT_ALLERGY_SENSITIVITY_ACTIONS.REQUEST_ADD_CUSTOM_ALLERGY_SENSITIVITY);
}

export function receivedAddCustomAllergySensitivity() {
    return createReducerObject(CLIENT_ALLERGY_SENSITIVITY_ACTIONS.RECEIVED_ADD_CUSTOM_ALLERGY_SENSITIVITY);
}

export function enableEditingClientAllergiesAndSensitivities() {
    return createReducerObject(CLIENT_ALLERGY_SENSITIVITY_ACTIONS.ENABLED_EDITING_CLIENT_ALLERGIES_AND_SENSITIVITIES);
}

export function disableEditingClientAllergiesAndSensitivities() {
    return createReducerObject(CLIENT_ALLERGY_SENSITIVITY_ACTIONS.DISABLED_EDIITING_CLIENT_ALLERGIES_AND_SENSITIVITIES);
}
