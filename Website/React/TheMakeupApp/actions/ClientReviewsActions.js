import {
    getRequest,
    deleteRequest,
    postRequest,
    putRequest
} from '../../Common/helpers/fetchUtilities';

import {
    API_ENDPOINTS,
    GetSessionKey,
    GetApiUrl,
    GetQueryApiUrl,
    GetUidApiUrl
} from '../constants/ApiInfo';
import ApiRequest from '../constants/ApiRequest';
import {
    requestClientReviews,
    receivedClientReviews,
    requestAddClientReview,
    receivedAddClientReview,
    requestUpdateClientReview,
    receivedUpdateClientReview,
    requestRemoveClientReview,
    receivedRemoveClientReview,
    enableEditingclientReviews,
    disableEditingclientReviews
} from '../reducers/ClientReviewReducer';
import {
    addErrorMessage,
    addSuccessMessage
} from './MessageActions';

export function getClientReviews(displayName) {
    const sessionKey = GetSessionKey();
    return (dispatch) => {
        dispatch(requestClientReviews());
        return ApiRequest(getRequest(GetQueryApiUrl(API_ENDPOINTS.CLIENT_REVIEWS, displayName), sessionKey), 'getClientReviews')
            .then((json) => {
                dispatch(receivedClientReviews(json.clientReviews));
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
                dispatch(receivedClientReviews([]));
            });
    };
}

export function addClientReview(clientProfileId, artistPortfolioId, rating, review, displayName) {
    const sessionKey = GetSessionKey();
    const clientReviewData = {
        clientProfileId,
        artistPortfolioId,
        rating,
        review
    };
    return (dispatch) => {
        dispatch(requestAddClientReview());
        return ApiRequest(putRequest(GetApiUrl(API_ENDPOINTS.CLIENT_REVIEWS), clientReviewData, sessionKey), 'addClientReview')
            .then((json) => {
                dispatch(receivedAddClientReview());
                dispatch(addSuccessMessage('Successfully Created Client Review'));
                dispatch(getClientReviews(displayName));
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
                dispatch(receivedAddClientReview());
            });
    };
}

export function updateClientReview(clientReviewId, rating, review, displayName) {
    const sessionKey = GetSessionKey();
    const clientReviewData = {
        rating,
        review
    };
    return (dispatch) => {
        dispatch(requestUpdateClientReview());
        return ApiRequest(postRequest(GetUidApiUrl(API_ENDPOINTS.CLIENT_REVIEWS, clientReviewId), clientReviewData, sessionKey), 'updateClientReview')
            .then((json) => {
                dispatch(receivedUpdateClientReview());
                dispatch(disableEditingclientReviews());
                dispatch(addSuccessMessage('Successfully Updated Client Review'));
                dispatch(getClientReviews(displayName));
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
                dispatch(receivedUpdateClientReview());
            });
    };
}

export function removeClientReview(clientReviewId, displayName) {
    const sessionKey = GetSessionKey();
    return (dispatch) => {
        dispatch(requestRemoveClientReview());
        return ApiRequest(deleteRequest(GetUidApiUrl(API_ENDPOINTS.CLIENT_REVIEWS, clientReviewId), sessionKey), 'removeClientReview')
            .then((json) => {
                dispatch(receivedRemoveClientReview());
                dispatch(addSuccessMessage('Successfully Removed Client Review'));
                dispatch(getClientReviews(displayName));
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
                dispatch(receivedRemoveClientReview());
            });
    };
}

export function enableClientReviewEditing(clientReviewId) {
    return (dispatch) => {
        dispatch(enableEditingclientReviews(clientReviewId));
    };
}

export function disableClientReviewEditing() {
    return (dispatch) => {
        dispatch(disableEditingclientReviews());
    };
}
