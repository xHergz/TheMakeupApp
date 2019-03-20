import { createReducerObject } from '../../Common/helpers/reducerUtilities';

const MEDIA_ACTIONS = {
    SET_USER: 'SET_USER',
    SET_BRIDGE: 'SET_BRIDGE'
};

const initialState = {
    user: '',
    bridge: ''
};

export default function mediaReducer(state = initialState, action) {
    switch (action.type) {
        case MEDIA_ACTIONS.SET_USER: {
            console.log('Changing User: ', action.payload);
            return {
                ...state,
                user: action.payload
            };
        }
        case MEDIA_ACTIONS.SET_BRIDGE: {
            console.log('Changing Bridge: ', action.payload);
            return {
                ...state,
                bridge: action.payload
            };
        }
        default:
            return state;
    }
}

export function setUser(user) {
    return createReducerObject(MEDIA_ACTIONS.SET_USER, user);
}

export function setBridge(bridge) {
    return createReducerObject(MEDIA_ACTIONS.SET_BRIDGE, bridge);
}
