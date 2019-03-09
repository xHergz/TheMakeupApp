import { createReducerObject } from '../../Common/helpers/reducerUtilities';

const CLIENT_REVIEW_ACTIONS = {
    REQUEST_CLIENT_REVIEWS: 'REQUEST_CLIENT_REVIEWS',
    RECEIVED_CLIENT_REVIEWS: 'RECEIVED_CLIENT_REVIEWS',
    REQUEST_ADD_CLIENT_REVIEW: 'REQUEST_ADD_CLIENT_REVIEW',
    RECEIVED_ADD_CLIENT_REVIEW: 'RECEIVED_ADD_CLIENT_REVIEW',
    REQUEST_UPDATE_CLIENT_REVIEW: 'REQUEST_UPDATE_CLIENT_REVIEW',
    RECEIVED_UPDATE_CLIENT_REVIEW: 'RECEIVED_UPDATE_CLIENT_REVIEW',
    REQUEST_REMOVE_CLIENT_REVIEW: 'REQUEST_REMOVE_CLIENT_REVIEW',
    RECEIVED_REMOVE_CLIENT_REVIEW: 'RECEIVED_REMOVE_CLIENT_REVIEW',
    ENABLED_EDITING_CLIENT_REVIEW: 'ENABLED_EDITING_CLIENT_REVIEW',
    DISABLED_EDIITING_CLIENT_REVIEW: 'DISABLED_EDIITING_CLIENT_REVIEW'
};

const initialState = {
    clientReviews: [],
    fetchingClientReviews: false,
    fetchingAddClientReview: false,
    fetchingUpdateClientReview: false,
    fetchingRemoveClientReview: false,
    editingClientReview: false,
    currentEditReviewId: null
};

export default function clientReviewReducer(state = initialState, action) {
    switch (action.type) {
        case CLIENT_REVIEW_ACTIONS.REQUEST_CLIENT_REVIEWS: {
            return {
                ...state,
                fetchingClientReviews: true
            };
        }
        case CLIENT_REVIEW_ACTIONS.RECEIVED_CLIENT_REVIEWS: {
            return {
                ...state,
                fetchingClientReviews: false,
                clientReviews: action.payload
            };
        }
        case CLIENT_REVIEW_ACTIONS.REQUEST_ADD_CLIENT_REVIEW: {
            return {
                ...state,
                fetchingAddClientReview: true
            };
        }
        case CLIENT_REVIEW_ACTIONS.RECEIVED_ADD_CLIENT_REVIEW: {
            return {
                ...state,
                fetchingAddClientReview: false
            };
        }
        case CLIENT_REVIEW_ACTIONS.REQUEST_UPDATE_CLIENT_REVIEW: {
            return {
                ...state,
                fetchingUpdateClientReview: true
            };
        }
        case CLIENT_REVIEW_ACTIONS.RECEIVED_UPDATE_CLIENT_REVIEW: {
            return {
                ...state,
                fetchingUpdateClientReview: false
            };
        }
        case CLIENT_REVIEW_ACTIONS.REQUEST_REMOVE_CLIENT_REVIEW: {
            return {
                ...state,
                fetchingRemoveClientReview: true
            };
        }
        case CLIENT_REVIEW_ACTIONS.RECEIVED_REMOVE_CLIENT_REVIEW: {
            return {
                ...state,
                fetchingRemoveClientReview: false
            };
        }
        case CLIENT_REVIEW_ACTIONS.ENABLED_EDITING_CLIENT_REVIEW: {
            return {
                ...state,
                editingClientReviews: true,
                currentEditReviewId: action.payload
            };
        }
        case CLIENT_REVIEW_ACTIONS.DISABLED_EDIITING_CLIENT_REVIEW: {
            return {
                ...state,
                editingClientReviews: false,
                currentEditReviewId: null
            };
        }
        default:
            return state;
    }
}

export function requestClientReviews() {
    return createReducerObject(CLIENT_REVIEW_ACTIONS.REQUEST_CLIENT_REVIEWS);
}

export function receivedClientReviews(clientReviews) {
    return createReducerObject(CLIENT_REVIEW_ACTIONS.RECEIVED_CLIENT_REVIEWS, clientReviews);
}

export function requestAddClientReview() {
    return createReducerObject(CLIENT_REVIEW_ACTIONS.REQUEST_ADD_CLIENT_REVIEW);
}

export function receivedAddClientReview() {
    return createReducerObject(CLIENT_REVIEW_ACTIONS.RECEIVED_ADD_CLIENT_REVIEW);
}

export function requestUpdateClientReview() {
    return createReducerObject(CLIENT_REVIEW_ACTIONS.REQUEST_UPDATE_CLIENT_REVIEW);
}

export function receivedUpdateClientReview() {
    return createReducerObject(CLIENT_REVIEW_ACTIONS.RECEIVED_UPDATE_CLIENT_REVIEW);
}

export function requestRemoveClientReview() {
    return createReducerObject(CLIENT_REVIEW_ACTIONS.REQUEST_REMOVE_CLIENT_REVIEW);
}

export function receivedRemoveClientReview() {
    return createReducerObject(CLIENT_REVIEW_ACTIONS.RECEIVED_REMOVE_CLIENT_REVIEW);
}

export function enableEditingclientReviews(clientReviewId) {
    return createReducerObject(CLIENT_REVIEW_ACTIONS.ENABLED_EDITING_CLIENT_REVIEWS, clientReviewId);
}

export function disableEditingclientReviews() {
    return createReducerObject(CLIENT_REVIEW_ACTIONS.DISABLED_EDIITING_CLIENT_REVIEWS);
}
