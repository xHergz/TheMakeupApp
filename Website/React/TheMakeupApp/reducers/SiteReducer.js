import { createReducerObject } from '../../Common/helpers/reducerUtilities';

const SITE_ACTIONS = {
    SET_CURRENT_PAGE: 'SET_CURRENT_PAGE'
};

const initialState = {
    currentPageKey: null
};

export default function siteReducer(state = initialState, action) {
    switch (action.type) {
        case SITE_ACTIONS.SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPageKey: action.payload
            };
        }
        default:
            return state;
    }
}

export function setCurrentPageKey(pageKey) {
    return createReducerObject(SITE_ACTIONS.SET_CURRENT_PAGE, pageKey);
}
