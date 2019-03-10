import { getRequest } from '../../Common/helpers/fetchUtilities';

import {
    API_ENDPOINTS,
    GetSessionKey,
    GetApiUrl
} from '../constants/ApiInfo';
import ApiRequest from '../constants/ApiRequest';
import {
    requestSanitizationQuizQuestions,
    receivedSanitizationQuizQuestions
} from '../reducers/SanitizationQuizReducer';
import { addErrorMessage } from './MessageActions';

/* eslint-disable import/prefer-default-export */
export function getSanitizationQuizQuestions() {
    const sessionKey = GetSessionKey();
    return (dispatch) => {
        dispatch(requestSanitizationQuizQuestions());
        return ApiRequest(getRequest(GetApiUrl(API_ENDPOINTS.SANITIZATION_QUIZ), sessionKey), 'getSanitizationQuizQuestions')
            .then((json) => {
                dispatch(receivedSanitizationQuizQuestions(json.sanitizationQuiz));
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
                dispatch(receivedSanitizationQuizQuestions([]));
            });
    };
}
