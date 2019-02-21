import { createReducerObject } from '../../Common/helpers/reducerUtilities';

const NOTIFICATION_ACTIONS = {
    REQUEST_NOTIFICATIONS: 'REQUEST_NOTIFICATIONS',
    RECEIVED_NOTIFICATIONS: 'RECEIVED_NOTIFICATIONS',
    REQUEST_MORE_NOTIFICATIONS: 'REQUEST_MORE_NOTIFICATIONS',
    RECEIVED_MORE_NOTIFICATIONS: 'RECEIVED_MORE_NOTIFICATIONS',
    RECEIVED_NEW_NOTIFICATIONS: 'RECEIVED_NEW_NOTIFICATIONS',
    ACKNOWLEDGE_NOTIFICATIONS: 'ACKNOWLEDGE_NOTIFICATIONS'
};

const initialState = {
    notifications: [],
    newNotifications: 0,
    canFetchMoreNotifications: true,
    isFetchingNotifications: false,
    isFetchingMoreNotifications: false
};

function appendNotificationsToList(notifications, moreNotifications) {
    return [
        ...notifications,
        ...moreNotifications
    ];
}

export default function notificationReducer(state = initialState, action) {
    switch (action.type) {
        case NOTIFICATION_ACTIONS.REQUEST_NOTIFICATIONS: {
            return {
                ...state,
                isFetchingNotifications: true
            };
        }
        case NOTIFICATION_ACTIONS.RECEIVED_NOTIFICATIONS: {
            return {
                ...state,
                notifications: action.payload,
                isFetchingNotifications: false,
                canFetchMoreNotifications: true
            };
        }
        case NOTIFICATION_ACTIONS.REQUEST_MORE_NOTIFICATIONS: {
            return {
                ...state,
                isFetchingMoreNotifications: true
            };
        }
        case NOTIFICATION_ACTIONS.RECEIVED_MORE_NOTIFICATIONS: {
            return {
                ...state,
                notifications: appendNotificationsToList(state.notifications, action.payload),
                isFetchingMoreNotifications: false,
                canFetchMoreNotifications: Array.isArray(action.payload) && action.payload.length !== 0
            };
        }
        case NOTIFICATION_ACTIONS.RECEIVED_NEW_NOTIFICATIONS: {
            return {
                ...state,
                newNotifications: action.payload
            };
        }
        case NOTIFICATION_ACTIONS.ACKNOWLEDGE_NOTIFICATIONS: {
            return {
                ...state,
                newNotifications: 0
            };
        }
        default:
            return state;
    }
}

export function requestNotifications() {
    return createReducerObject(NOTIFICATION_ACTIONS.REQUEST_NOTIFICATIONS);
}

export function receivedNotifications(notifications) {
    return createReducerObject(NOTIFICATION_ACTIONS.RECEIVED_NOTIFICATIONS, notifications);
}

export function requestMoreNotifications() {
    return createReducerObject(NOTIFICATION_ACTIONS.REQUEST_MORE_NOTIFICATIONS);
}

export function receivedMoreNotifications(moreNotifications) {
    return createReducerObject(NOTIFICATION_ACTIONS.RECEIVED_MORE_NOTIFICATIONS, moreNotifications);
}

export function receivedNewNotifications(numberOfNotifications) {
    return createReducerObject(NOTIFICATION_ACTIONS.RECEIVED_NEW_NOTIFICATIONS, numberOfNotifications);
}

export function acknowledgeNotifications() {
    return createReducerObject(NOTIFICATION_ACTIONS.ACKNOWLEDGE_NOTIFICATIONS);
}
