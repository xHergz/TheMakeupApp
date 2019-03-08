import { createReducerObject } from '../../Common/helpers/reducerUtilities';

const CLIENT_PROFILE_ACTIONS = {
    REQUEST_CLIENT_PROFILE: 'REQUEST_CLIENT_PROFILE',
    RECEIVED_CLIENT_PROFILE: 'RECEIVED_CLIENT_PROFILE',
    REQUEST_CREATE_CLIENT_PROFILE: 'REQUEST_CREATE_CLIENT_PROFILE',
    RECEIVED_CREATE_CLIENT_PROFILE: 'RECEIVED_CREATE_CLIENT_PROFILE',
    REQUEST_UPDATE_CLIENT_PROFILE: 'REQUEST_UPDATE_CLIENT_PROFILE',
    RECEIVED_UPDATE_CLIENT_PROFILE: 'RECEIVED_UPDATE_CLIENT_PROFILE',
    ENABLED_EDITING_CLIENT_PROFILE: 'ENABLED_EDITING_CLIENT_PROFILE',
    DISABLE_EDITING_CLIENT_PROFILE: 'DISABLE_EDITING_CLIENT_PROFILE',
    REQUEST_EYE_COLOURS: 'REQUEST_EYE_COLOURS',
    RECEIVED_EYE_COLOURS: 'RECEIVED_EYE_COLOURS',
    REQUEST_HAIR_COLOURS: 'REQUEST_HAIR_COLOURS',
    RECEIVED_HAIR_COLOURS: 'RECEIVED_HAIR_COLOURS',
    REQUEST_SKIN_TONES: 'REQUEST_SKIN_TONES',
    RECEIVED_SKIN_TONES: 'RECEIVED_SKIN_TONES'
};

const initialState = {
    currentClientProfile: {},
    fetchingClientProfile: false,
    fetchingCreateClientProfile: false,
    fetchingUpdateClientProfile: false,
    editingClientProfile: false,
    eyeColours: [],
    hairColours: [],
    skinTones: [],
    fetchingEyeColours: false,
    fetchingHairColours: false,
    fetchingSkinTones: false
};

export default function clientProfileReducer(state = initialState, action) {
    switch (action.type) {
        case CLIENT_PROFILE_ACTIONS.REQUEST_CLIENT_PROFILE: {
            return {
                ...state,
                fetchingClientProfile: true
            };
        }
        case CLIENT_PROFILE_ACTIONS.RECEIVED_CLIENT_PROFILE: {
            return {
                ...state,
                fetchingClientProfile: false,
                currentClientProfile: action.payload
            };
        }
        case CLIENT_PROFILE_ACTIONS.REQUEST_CREATE_CLIENT_PROFILE: {
            return {
                ...state,
                fetchingCreateClientProfile: true
            };
        }
        case CLIENT_PROFILE_ACTIONS.RECEIVED_CREATE_CLIENT_PROFILE: {
            return {
                ...state,
                fetchingCreateClientProfile: false
            };
        }
        case CLIENT_PROFILE_ACTIONS.REQUEST_UPDATE_CLIENT_PROFILE: {
            return {
                ...state,
                fetchingUpdateClientProfile: true
            };
        }
        case CLIENT_PROFILE_ACTIONS.RECEIVED_UPDATE_CLIENT_PROFILE: {
            return {
                ...state,
                fetchingUpdateClientProfile: false
            };
        }
        case CLIENT_PROFILE_ACTIONS.ENABLED_EDITING_CLIENT_PROFILE: {
            return {
                ...state,
                editingClientProfile: true
            };
        }
        case CLIENT_PROFILE_ACTIONS.DISABLE_EDITING_CLIENT_PROFILE: {
            return {
                ...state,
                editingClientProfile: false
            };
        }
        case CLIENT_PROFILE_ACTIONS.REQUEST_EYE_COLOURS: {
            return {
                ...state,
                fetchingEyeColours: true
            };
        }
        case CLIENT_PROFILE_ACTIONS.RECEIVED_EYE_COLOURS: {
            return {
                ...state,
                fetchingEyeColours: false,
                eyeColours: action.payload
            };
        }
        case CLIENT_PROFILE_ACTIONS.REQUEST_HAIR_COLOURS: {
            return {
                ...state,
                fetchingHairColours: true
            };
        }
        case CLIENT_PROFILE_ACTIONS.RECEIVED_HAIR_COLOURS: {
            return {
                ...state,
                fetchingHairColours: false,
                hairColours: action.payload
            };
        }
        case CLIENT_PROFILE_ACTIONS.REQUEST_SKIN_TONES: {
            return {
                ...state,
                fetchingSkinTones: true
            };
        }
        case CLIENT_PROFILE_ACTIONS.RECEIVED_SKIN_TONES: {
            return {
                ...state,
                fetchingSkinTones: false,
                skinTones: action.payload
            };
        }
        default:
            return state;
    }
}

export function requestClientProfile() {
    return createReducerObject(CLIENT_PROFILE_ACTIONS.REQUEST_CLIENT_PROFILE);
}

export function receivedClientProfile(clientProfile) {
    return createReducerObject(CLIENT_PROFILE_ACTIONS.RECEIVED_CLIENT_PROFILE, clientProfile);
}

export function requestCreateClientProfile() {
    return createReducerObject(CLIENT_PROFILE_ACTIONS.REQUEST_CREATE_CLIENT_PROFILE);
}

export function receivedCreateClientProfile() {
    return createReducerObject(CLIENT_PROFILE_ACTIONS.RECEIVED_CREATE_CLIENT_PROFILE);
}

export function requestUpdateClientProfile() {
    return createReducerObject(CLIENT_PROFILE_ACTIONS.REQUEST_UPDATE_CLIENT_PROFILE);
}

export function receivedUpdateClientProfile() {
    return createReducerObject(CLIENT_PROFILE_ACTIONS.RECEIVED_UPDATE_CLIENT_PROFILE);
}

export function enableEditingClientProfile() {
    return createReducerObject(CLIENT_PROFILE_ACTIONS.ENABLED_EDITING_CLIENT_PROFILE);
}

export function disableEditingClientProfile() {
    return createReducerObject(CLIENT_PROFILE_ACTIONS.DISABLE_EDITING_CLIENT_PROFILE);
}

export function requestEyeColours() {
    return createReducerObject(CLIENT_PROFILE_ACTIONS.REQUEST_EYE_COLOURS);
}

export function receivedEyeColours(eyeColours) {
    return createReducerObject(CLIENT_PROFILE_ACTIONS.RECEIVED_EYE_COLOURS, eyeColours);
}

export function requestHairColours() {
    return createReducerObject(CLIENT_PROFILE_ACTIONS.REQUEST_HAIR_COLOURS);
}

export function receivedHairColours(hairColours) {
    return createReducerObject(CLIENT_PROFILE_ACTIONS.RECEIVED_HAIR_COLOURS, hairColours);
}

export function requestSkinTones() {
    return createReducerObject(CLIENT_PROFILE_ACTIONS.REQUEST_SKIN_TONES);
}

export function receivedSkinTones(skinTones) {
    return createReducerObject(CLIENT_PROFILE_ACTIONS.RECEIVED_SKIN_TONES, skinTones);
}
