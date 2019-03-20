import {
    addRoom,
    setAudio,
    setBridge,
    setUser,
    setVideo
} from '../reducers/ConsultationReducer';

export function addConsultationRoom(room) {
    return (dispatch) => {
        dispatch(addRoom(room));
    };
}

export function setConsultationAudio(audio) {
    return (dispatch) => {
        dispatch(setAudio(audio));
    };
}

export function setConsultationBridge(bridge) {
    return (dispatch) => {
        dispatch(setBridge(bridge));
    };
}

export function setConsultationUser(user) {
    return (dispatch) => {
        dispatch(setUser(user));
    };
}

export function setConsultationVideo(video) {
    return (dispatch) => {
        dispatch(setVideo(video));
    };
}
