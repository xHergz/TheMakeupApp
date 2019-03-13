import { createReducerObject } from '../../Common/helpers/reducerUtilities';

const ARTIST_SERVICE_CONSULTATION_ACTIONS = {
    REQUEST_ARTIST_SERVICE_CONSULTATIONS: 'REQUEST_ARTIST_SERVICE_CONSULTATIONS',
    RECEIVED_ARTIST_SERVICE_CONSULTATIONS: 'RECEIVED_ARTIST_SERVICE_CONSULTATIONS',
    REQUEST_CONSULTATION_TYPES: 'REQUEST_CONSULTATION_TYPES',
    RECEIVED_CONSULTATION_TYPES: 'RECEIVED_CONSULTATION_TYPES',
    REQUEST_ADD_ARTIST_SERVICE_CONSULTATION: 'REQUEST_ADD_ARTIST_SERVICE_CONSULTATION',
    RECEIVED_ADD_ARTIST_SERVICE_CONSULTATION: 'RECEIVED_ADD_ARTIST_SERVICE_CONSULTATION',
    REQUEST_DELETE_ARTIST_SERVICE_CONSULTATION: 'REQUEST_DELETE_ARTIST_SERVICE_CONSULTATION',
    RECEIVED_DELETE_ARTIST_SERVICE_CONSULTATION: 'RECEIVED_DELETE_ARTIST_SERVICE_CONSULTATION',
    ENABLED_EDITING_ARTIST_SERVICE_CONSULTATIONS: 'ENABLED_EDITING_ARTIST_SERVICE_CONSULTATIONS',
    DISABLE_EDITING_ARTIST_SERVICE_CONSULTATIONS: 'DISABLE_EDITING_ARTIST_SERVICE_CONSULTATIONS'
};

const initialState = {
    artistServiceConsultations: [],
    consultationTypes: [],
    fetchingArtistServiceConsultations: false,
    fetchingConsultationTypes: false,
    fetchingAddArtistServiceConsultation: false,
    fetchingDeleteArtistServiceConsultation: false,
    editingArtistServiceConsultations: false
};

export default function artistServiceConsultationReducer(state = initialState, action) {
    switch (action.type) {
        case ARTIST_SERVICE_CONSULTATION_ACTIONS.REQUEST_ARTIST_SERVICE_CONSULTATIONS: {
            return {
                ...state,
                fetchingArtistServiceConsultations: true
            };
        }
        case ARTIST_SERVICE_CONSULTATION_ACTIONS.RECEIVED_ARTIST_SERVICE_CONSULTATIONS: {
            return {
                ...state,
                fetchingArtistServiceConsultations: false,
                artistServiceConsultations: action.payload
            };
        }
        case ARTIST_SERVICE_CONSULTATION_ACTIONS.REQUEST_CONSULTATION_TYPES: {
            return {
                ...state,
                fetchingConsultationTypes: true
            };
        }
        case ARTIST_SERVICE_CONSULTATION_ACTIONS.RECEIVED_CONSULTATION_TYPES: {
            return {
                ...state,
                fetchingConsultationTypes: false,
                consultationTypes: action.payload
            };
        }
        case ARTIST_SERVICE_CONSULTATION_ACTIONS.REQUEST_ADD_ARTIST_SERVICE_CONSULTATION: {
            return {
                ...state,
                fetchingAddArtistServiceConsultation: true
            };
        }
        case ARTIST_SERVICE_CONSULTATION_ACTIONS.RECEIVED_ADD_ARTIST_SERVICE_CONSULTATION: {
            return {
                ...state,
                fetchingAddArtistServiceConsultation: false
            };
        }
        case ARTIST_SERVICE_CONSULTATION_ACTIONS.REQUEST_DELETE_ARTIST_SERVICE_CONSULTATION: {
            return {
                ...state,
                fetchingDeleteArtistServiceConsultation: true
            };
        }
        case ARTIST_SERVICE_CONSULTATION_ACTIONS.RECEIVED_DELETE_ARTIST_SERVICE_CONSULTATION: {
            return {
                ...state,
                fetchingDeleteArtistServiceConsultation: false
            };
        }
        case ARTIST_SERVICE_CONSULTATION_ACTIONS.ENABLED_EDITING_ARTIST_SERVICE_CONSULTATIONS: {
            return {
                ...state,
                editingArtistServiceConsultations: true
            };
        }
        case ARTIST_SERVICE_CONSULTATION_ACTIONS.DISABLE_EDITING_ARTIST_SERVICE_CONSULTATIONS: {
            return {
                ...state,
                editingArtistServiceConsultations: false
            };
        }
        default:
            return state;
    }
}

export function requestArtistServiceConsultations() {
    return createReducerObject(ARTIST_SERVICE_CONSULTATION_ACTIONS.REQUEST_ARTIST_SERVICE_CONSULTATIONS);
}

export function receivedArtistServiceConsultations(artistServiceConsultations) {
    return createReducerObject(ARTIST_SERVICE_CONSULTATION_ACTIONS.RECEIVED_ARTIST_SERVICE_CONSULTATIONS, artistServiceConsultations);
}

export function requestConsultationTypes() {
    return createReducerObject(ARTIST_SERVICE_CONSULTATION_ACTIONS.REQUEST_ARTIST_SERVICE_CONSULTATIONS);
}

export function receivedConsultationTypes(consultationTypes) {
    return createReducerObject(ARTIST_SERVICE_CONSULTATION_ACTIONS.RECEIVED_ARTIST_SERVICE_CONSULTATIONS, consultationTypes);
}


export function requestAddArtistServiceConsultation() {
    return createReducerObject(ARTIST_SERVICE_CONSULTATION_ACTIONS.REQUEST_ADD_ARTIST_SERVICE_CONSULTATION);
}

export function receivedAddArtistServiceConsultation() {
    return createReducerObject(ARTIST_SERVICE_CONSULTATION_ACTIONS.RECEIVED_ADD_ARTIST_SERVICE_CONSULTATION);
}

export function requestDeleteArtistServiceConsultation() {
    return createReducerObject(ARTIST_SERVICE_CONSULTATION_ACTIONS.REQUEST_DELETE_ARTIST_SERVICE_CONSULTATION);
}

export function receivedDeleteArtistServiceConsultation() {
    return createReducerObject(ARTIST_SERVICE_CONSULTATION_ACTIONS.RECEIVED_DELETE_ARTIST_SERVICE_CONSULTATION);
}

export function enableEditingArtistServiceConsultations() {
    return createReducerObject(ARTIST_SERVICE_CONSULTATION_ACTIONS.ENABLED_EDITING_ARTIST_SERVICE_CONSULTATIONS);
}

export function disableEditingArtistServiceConsultations() {
    return createReducerObject(ARTIST_SERVICE_CONSULTATION_ACTIONS.DISABLE_EDITING_ARTIST_SERVICE_CONSULTATIONS);
}
