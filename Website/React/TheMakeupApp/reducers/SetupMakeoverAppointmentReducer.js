import { createReducerObject } from '../../Common/helpers/reducerUtilities';

const SETUP_MAKEOVER_APPOINTMENT_ACTIONS = {
    CREATE_NEW_APPOINTMENT_FORM: 'CREATE_NEW_APPOINTMENT_FORM',
    APPOINTMENT_FORM_SUBMITTED: 'APPOINTMENT_FORM_SUBMITTED',
    REQUEST_CREATE_MAKEOVER_APPOINTMENT: 'REQUEST_CREATE_MAKEOVER_APPOINTMENT',
    RECEIVED_CREATE_MAKEOVER_APPOINTMENT: 'RECEIVED_CREATE_MAKEOVER_APPOINTMENT'
};

const initialState = {
    artistPortfolioId: null,
    artistDisplayName: null,
    makeoverTypeId: null,
    makeoverTypeDescription: null,
    serviceTypeId: null,
    serviceTypeDescription: null,
    servicePrice: null,
    submitted: false,
    fetchingCreateMakeoverAppointment: false
};

export default function setupMakeoverAppointmentReducer(state = initialState, action) {
    switch (action.type) {
        case SETUP_MAKEOVER_APPOINTMENT_ACTIONS.CREATE_NEW_APPOINTMENT_FORM: {
            return {
                ...state,
                artistPortfolioId: action.payload.artistPortfolioId,
                artistDisplayName: action.payload.artistDisplayName,
                makeoverTypeId: action.payload.makeoverTypeId,
                makeoverTypeDescription: action.payload.makeoverTypeDescription,
                serviceTypeId: action.payload.serviceTypeId,
                serviceTypeDescription: action.payload.serviceTypeDescription,
                servicePrice: action.payload.servicePrice,
                submitted: false
            };
        }
        case SETUP_MAKEOVER_APPOINTMENT_ACTIONS.APPOINTMENT_FORM_SUBMITTED: {
            return {
                ...state,
                submitted: true
            };
        }
        case SETUP_MAKEOVER_APPOINTMENT_ACTIONS.REQUEST_CREATE_MAKEOVER_APPOINTMENT: {
            return {
                ...state,
                fetchingCreateMakeoverAppointment: true
            };
        }
        case SETUP_MAKEOVER_APPOINTMENT_ACTIONS.RECEIVED_CREATE_MAKEOVER_APPOINTMENT: {
            return {
                ...state,
                fetchingCreateMakeoverAppointment: false
            };
        }
        default:
            return state;
    }
}

export function createNewMakeoverAppointmentForm(formData) {
    return createReducerObject(SETUP_MAKEOVER_APPOINTMENT_ACTIONS.CREATE_NEW_APPOINTMENT_FORM, formData);
}

export function makeoverAppointmentFormSubmitted() {
    return createReducerObject(SETUP_MAKEOVER_APPOINTMENT_ACTIONS.APPOINTMENT_FORM_SUBMITTED);
}

export function requestCreateMakeoverAppointment() {
    return createReducerObject(SETUP_MAKEOVER_APPOINTMENT_ACTIONS.REQUEST_CREATE_MAKEOVER_APPOINTMENT);
}

export function receivedCreateMakeoverAppointment() {
    return createReducerObject(SETUP_MAKEOVER_APPOINTMENT_ACTIONS.RECEIVED_CREATE_MAKEOVER_APPOINTMENT);
}
