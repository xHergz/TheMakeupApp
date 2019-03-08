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

}

export function addClientReview(clientProfileId, artistPortfolioId, rating, review) {

}

export function updateClientReview(clientReviewId, rating, review) {

}

export function removeClientReview(clientReviewId) {

}

export function enableClientReviewEditing(clientReviewId) {

}

export function disableClientReviewEditing() {

}
