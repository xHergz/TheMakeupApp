import HTTP_STATUS from '../../Common/constants/HttpStatus';
import { getCookie } from '../../Common/helpers/browserUtilities';
import { getRequest } from '../../Common/helpers/fetchUtilities';
import { addErrorMessage } from './MessageActions';
import {
    API_ENDPOINTS,
    GetUidApiUrl
} from '../constants/ApiInfo';
import {
    setSessionKey,
    requestSessionInfo,
    receivedSessionInfo
} from '../reducers/SessionReducer';

export function getCurrentSessionInfo() {
    return (dispatch) => {
        dispatch(requestSessionInfo());
        const sessionKey = getCookie('tma_session_key');
        dispatch(setSessionKey(sessionKey));
        if (sessionKey != null) {
            return getRequest(GetUidApiUrl(API_ENDPOINTS.SESSION, sessionKey), sessionKey)
                .then((response) => {
                    if (response.status !== HTTP_STATUS.OK) {
                        const errorMessage = `Error calling 'getCurrentSessionInfo': HTTP Status = ${response.status}`;
                        dispatch(addErrorMessage(errorMessage));
                        Promise.reject(new Error(errorMessage));
                    }
                    return response.json();
                })
                .then((json) => {
                    if (json === null || json === undefined) {
                        const errorMessage = 'Error calling \'getCurrentSessionInfo\': JSON is null or undefined';
                        dispatch(addErrorMessage(errorMessage));
                        Promise.reject(new Error(errorMessage));
                    }
                    else if (json.status !== 0) {
                        const errorMessage = `Error calling 'getCurrentSessionInfo': Result = ${json.result}`;
                        dispatch(addErrorMessage(errorMessage));
                        Promise.reject(new Error(errorMessage));
                    }
                    dispatch(receivedSessionInfo(json.session));
                })
                .catch(error => console.error(error));
        }
        console.error('Session Key Cookie Not Set');
        return null;
    };
}

export function temp() {

}
