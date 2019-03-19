import { createReducerObject } from '../../Common/helpers/reducerUtilities';

const MAKEOVER_APPOINTMENT_ACTIONS = {
    REQUEST_MAKEOVER_APPOINTMENT: 'REQUEST_MAKEOVER_APPOINTMENT',
    RECEIVED_MAKEOVER_APPOINTMENT: 'RECEIVED_MAKEOVER_APPOINTMENT',
    REQUEST_MAKEOVER_APPOINTMENTS: 'REQUEST_MAKEOVER_APPOINTMENTS',
    RECEIVED_MAKEOVER_APPOINTMENTS: 'RECEIVED_MAKEOVER_APPOINTMENTS',
    REQUEST_MAKEOVER_APPOINTMENT_ADDONS: 'REQUEST_MAKEOVER_APPOINTMENT_ADDONS',
    RECEIVED_MAKEOVER_APPOINTMENT_ADDONS: 'RECEIVED_MAKEOVER_APPOINTMENT_ADDONS'
};

const initialState = {
    currentMakeoverAppointment: null,
    currentMakeoverAppointmentAddons: [],
    makeoverAppointments: [],
    fetchingMakeoverAppointment: false,
    fetchingMakeoverAppointmentAddons: false,
    fetchingMakeoverAppointments: false
};

export default function makeoverAppointmentReducer(state = initialState, action) {
    switch (action.type) {
        case MAKEOVER_APPOINTMENT_ACTIONS.REQUEST_MAKEOVER_APPOINTMENT: {
            return {
                ...state,
                fetchingMakeoverAppointment: true
            };
        }
        case MAKEOVER_APPOINTMENT_ACTIONS.RECEIVED_MAKEOVER_APPOINTMENT: {
            return {
                ...state,
                currentMakeoverAppointment: action.payload,
                fetchingMakeoverAppointment: false
            };
        }
        case MAKEOVER_APPOINTMENT_ACTIONS.REQUEST_MAKEOVER_APPOINTMENTS: {
            return {
                ...state,
                fetchingMakeoverAppointments: true
            };
        }
        case MAKEOVER_APPOINTMENT_ACTIONS.RECEIVED_MAKEOVER_APPOINTMENTS: {
            return {
                ...state,
                makeoverAppointments: action.payload === null ? [] : action.payload,
                fetchingMakeoverAppointments: false
            };
        }
        case MAKEOVER_APPOINTMENT_ACTIONS.REQUEST_MAKEOVER_APPOINTMENT_ADDONS: {
            return {
                ...state,
                fetchingMakeoverAppointmentAddons: true
            };
        }
        case MAKEOVER_APPOINTMENT_ACTIONS.RECEIVED_MAKEOVER_APPOINTMENT_ADDONS: {
            return {
                ...state,
                currentMakeoverAppointmentAddons: action.payload === null ? [] : action.payload,
                fetchingMakeoverAppointmentAddons: false
            };
        }
        default:
            return state;
    }
}

export function requestMakeoverAppointment() {
    return createReducerObject(MAKEOVER_APPOINTMENT_ACTIONS.REQUEST_MAKEOVER_APPOINTMENT);
}

export function receivedMakeoverAppointment(makeoverAppointment) {
    return createReducerObject(MAKEOVER_APPOINTMENT_ACTIONS.RECEIVED_MAKEOVER_APPOINTMENT, makeoverAppointment);
}

export function requestMakeoverAppointments() {
    return createReducerObject(MAKEOVER_APPOINTMENT_ACTIONS.REQUEST_MAKEOVER_APPOINTMENTS);
}

export function receivedMakeoverAppointments(makeoverAppointments) {
    return createReducerObject(MAKEOVER_APPOINTMENT_ACTIONS.RECEIVED_MAKEOVER_APPOINTMENTS, makeoverAppointments);
}


export function requestMakeoverAppointmentAddons() {
    return createReducerObject(MAKEOVER_APPOINTMENT_ACTIONS.REQUEST_MAKEOVER_APPOINTMENT_ADDONS);
}

export function receivedMakeoverAppointmentAddons(addons) {
    return createReducerObject(MAKEOVER_APPOINTMENT_ACTIONS.RECEIVED_MAKEOVER_APPOINTMENT_ADDONS, addons);
}
