import { getCookie } from '../../Common/helpers/browserUtilities';
import { getRequest } from '../../Common/helpers/fetchUtilities';

import {
    API_ENDPOINTS,
    GetUidApiUrl
} from '../constants/ApiInfo';
import ApiRequest from '../constants/ApiRequest';
import {
    setSessionKey,
    requestSessionInfo,
    receivedSessionInfo
} from '../reducers/SessionReducer';
import { addErrorMessage } from './MessageActions';

export function getCurrentSessionInfo() {
    return (dispatch) => {
        dispatch(requestSessionInfo());
        const sessionKey = getCookie('tma_session_key');
        dispatch(setSessionKey(sessionKey));
        if (sessionKey != null) {
            return ApiRequest(getRequest(GetUidApiUrl(API_ENDPOINTS.SESSION, sessionKey), sessionKey), 'getCurrentSessionInfo')
                .then((json) => {
                    console.log('Got here2');
                    dispatch(receivedSessionInfo(json.session));
                })
                .catch((error) => {
                    console.log(error.message);
                    dispatch(addErrorMessage(error.message));
                });
        }
        console.error('Session Key Cookie Not Set');
        return null;
    };
}

export function temp() {

}
