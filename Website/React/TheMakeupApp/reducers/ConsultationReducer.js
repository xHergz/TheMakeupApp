import { createReducerObject } from '../../Common/helpers/reducerUtilities';

const ROOM_ACTIONS = {
    ADD_ROOM: 'ADD_ROOM',
    SET_AUDIO: 'SET_AUDIO',
    SET_BRIDGE: 'SET_BRIDGE',
    SET_USER: 'SET_USER',
    SET_VIDEO: 'SET_VIDEO',
    REQUEST_CONSULTATION: 'REQUEST_CONSULTATION',
    RECEIVED_CONSULTATION: 'RECEIVED_CONSULTATION',
    REQUEST_CREATE_CONSULTATION: 'REQUEST_CREATE_CONSULTATION',
    RECEIVED_CREATE_CONSULTATION: 'RECEIVED_CREATE_CONSULTATION'
};

const initialState = {
    audio: false,
    bridge: '',
    rooms: [],
    user: '',
    video: false,
    currentConsultation: null,
    fetchingConsultation: false,
    fetchingCreateConsultation: false
};

export default function consultationReducer(state = initialState, action) {
    switch (action.type) {
        case ROOM_ACTIONS.ADD_ROOM: {
            return {
                ...state,
                rooms: [
                    ...state.rooms,
                    action.payload
                ]
            };
        }
        case ROOM_ACTIONS.SET_AUDIO: {
            return {
                ...state,
                audio: action.payload
            };
        }
        case ROOM_ACTIONS.SET_BRIDGE: {
            return {
                ...state,
                bridge: action.payload
            };
        }
        case ROOM_ACTIONS.SET_USER: {
            return {
                ...state,
                user: action.payload
            };
        }
        case ROOM_ACTIONS.SET_VIDEO: {
            return {
                ...state,
                video: action.payload
            };
        }
        case ROOM_ACTIONS.REQUEST_CONSULTATION: {
            return {
                ...state,
                fetchingConsultation: true
            };
        }
        case ROOM_ACTIONS.RECEIVED_CONSULTATION: {
            return {
                ...state,
                fetchingConsultation: false,
                currentConsultation: action.payload
            };
        }
        case ROOM_ACTIONS.REQUEST_CREATE_CONSULTATION: {
            return {
                ...state,
                fetchingCreateConsultation: true
            };
        }
        case ROOM_ACTIONS.RECEIVED_CREATE_CONSULTATION: {
            return {
                ...state,
                fetchingCreateConsultation: false
            };
        }
        default:
            return state;
    }
}

export function addRoom(room) {
    return createReducerObject(ROOM_ACTIONS.ADD_ROOM, room);
}

export function setAudio(audio) {
    return createReducerObject(ROOM_ACTIONS.SET_AUDIO, audio);
}

export function setBridge(bridge) {
    return createReducerObject(ROOM_ACTIONS.SET_BRIDGE, bridge);
}

export function setUser(user) {
    return createReducerObject(ROOM_ACTIONS.SET_USER, user);
}

export function setVideo(video) {
    return createReducerObject(ROOM_ACTIONS.SET_VIDEO, video);
}

export function requestConsultation() {
    return createReducerObject(ROOM_ACTIONS.REQUEST_CONSULTATION);
}

export function receivedConsultation(consultation) {
    return createReducerObject(ROOM_ACTIONS.RECEIVED_CONSULTATION, consultation);
}

export function requestCreateConsultation() {
    return createReducerObject(ROOM_ACTIONS.REQUEST_CREATE_CONSULTATION);
}

export function receivedCreateConsultation() {
    return createReducerObject(ROOM_ACTIONS.RECEIVED_CREATE_CONSULTATION);
}
