import { createReducerObject } from '../../Common/helpers/reducerUtilities';

const ROOM_ACTIONS = {
    ADD_ROOM: 'ADD_ROOM'
};

const initialState = {
    rooms: []
};

export default function roomReducer(state = initialState, action) {
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
        default:
            return state;
    }
}

export function addRoom(room) {
    return createReducerObject(ROOM_ACTIONS.ADD_ROOM, room);
}
