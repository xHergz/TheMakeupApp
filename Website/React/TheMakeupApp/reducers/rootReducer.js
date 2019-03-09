
import { combineReducers } from 'redux';

import clientAllergySensitivityReducer from './ClientAllergySensitivityReducer';
import clientHeadshotReducer from './ClientHeadshotReducer';
import clientProductPreferenceReducer from './ClientProductPreferenceReducer';
import clientProfileReducer from './ClientProfileReducer';
import clientReviewReducer from './ClientReviewReducer';
import messageReducer from './MessageReducer';
import notificationReducer from './NotificationReducer';
import sessionReducer from './SessionReducer';
import siteReducer from './SiteReducer';
import userReducer from './UserReducer';

const rootReducer = combineReducers({
    clientAllergySensitivityReducer,
    clientHeadshotReducer,
    clientProductPreferenceReducer,
    clientProfileReducer,
    clientReviewReducer,
    messageReducer,
    notificationReducer,
    sessionReducer,
    siteReducer,
    userReducer
});

export default rootReducer;
