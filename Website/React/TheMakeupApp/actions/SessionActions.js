import { getRequest } from '../../Common/helpers/fetchUtilities';

import {
    API_ENDPOINTS,
    GetUidApiUrl,
    GetSessionKey
} from '../constants/ApiInfo';
import ApiRequest from '../constants/ApiRequest';
import {
    requestSessionInfo,
    receivedSessionInfo
} from '../reducers/SessionReducer';
import { addErrorMessage } from './MessageActions';

export function getSessionInfo() {
    const sessionKey = GetSessionKey();
    return (dispatch) => {
        dispatch(requestSessionInfo());
        return ApiRequest(getRequest(GetUidApiUrl(API_ENDPOINTS.SESSION, sessionKey), sessionKey), 'getCurrentSessionInfo')
            .then((json) => {
                dispatch(receivedSessionInfo(json.session));
            })
            .catch((error) => {
                console.error(error);
                dispatch(addErrorMessage(error.message));
            });
    };
}
