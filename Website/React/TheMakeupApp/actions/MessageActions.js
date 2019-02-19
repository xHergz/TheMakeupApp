import MESSAGE_TYPE from '../constants/MessageType';
import {
    addPageMessage,
    dismissPageMessage,
    clearPageMessages
} from '../reducers/MessageReducer';

export function addSuccessMessage(message) {
    return (dispatch) => {
        dispatch(addPageMessage(MESSAGE_TYPE.SUCCESS, message));
    };
}

export function addWarningMessage(message) {
    return (dispatch) => {
        dispatch(addPageMessage(MESSAGE_TYPE.WARNING, message));
    };
}

export function addErrorMessage(message) {
    console.log(`Adding error: ${message}`);
    return (dispatch) => {
        dispatch(addPageMessage(MESSAGE_TYPE.ERROR, message));
    };
}

export function dismissMessage(messageId) {
    return (dispatch) => {
        dispatch(dismissPageMessage(messageId));
    };
}

export function clearMessages() {
    return (dispatch) => {
        dispatch(clearPageMessages());
    };
}
