import { createReducerObject } from '../../Common/helpers/reducerUtilities';

const ROOM_ACTIONS = {
    ADD_ROOM: 'ADD_ROOM',
    SET_AUDIO: 'SET_AUDIO',
    SET_BRIDGE: 'SET_BRIDGE',
    SET_USER: 'SET_USER',
    SET_VIDEO: 'SET_VIDEO'
};

const initialState = {
    audio: null,
    bridge: '',
    rooms: [],
    user: '',
    video: null
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
