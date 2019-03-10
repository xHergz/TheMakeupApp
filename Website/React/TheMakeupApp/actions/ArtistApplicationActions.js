import { putRequest } from '../../Common/helpers/fetchUtilities';

import {
    API_ENDPOINTS,
    GetSessionKey,
    GetApiUrl
} from '../constants/ApiInfo';
import ApiRequest from '../constants/ApiRequest';
import {
    requestCreateArtistApplication,
    receivedCreateArtistApplication,
    artistApplicationSubmitted
} from '../reducers/ArtistApplicationReducer';
import { addErrorMessage } from './MessageActions';

/* eslint-disable import/prefer-default-export */
export function createArtistApplication(clientProfileId, resume, coverLetter, existingPortfolioLinks, sanitizationQuizAnswers) {
    const sessionKey = GetSessionKey();
    const applicationData = {
        clientProfileId,
        resume,
        coverLetter,
        existingPortfolioLinks,
        sanitizationQuizAnswers
    };
    return (dispatch) => {
        dispatch(requestCreateArtistApplication());
        return ApiRequest(putRequest(GetApiUrl(API_ENDPOINTS.ARTIST_APPLICATION), applicationData, sessionKey), 'createArtistApplication')
            .then((json) => {
                dispatch(receivedCreateArtistApplication());
                dispatch(artistApplicationSubmitted());
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
                dispatch(receivedCreateArtistApplication([]));
            });
    };
}
