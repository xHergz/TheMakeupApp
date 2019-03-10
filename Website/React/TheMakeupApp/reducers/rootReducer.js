
import { combineReducers } from 'redux';

import artistApplicationReducer from './ArtistApplicationReducer';
import clientAllergySensitivityReducer from './ClientAllergySensitivityReducer';
import clientHeadshotReducer from './ClientHeadshotReducer';
import clientProductPreferenceReducer from './ClientProductPreferenceReducer';
import clientProfileReducer from './ClientProfileReducer';
import clientReviewReducer from './ClientReviewReducer';
import messageReducer from './MessageReducer';
import notificationReducer from './NotificationReducer';
import sanitizationQuizReducer from './SanitizationQuizReducer';
import sessionReducer from './SessionReducer';
import siteReducer from './SiteReducer';
import userReducer from './UserReducer';

const rootReducer = combineReducers({
    artistApplicationReducer,
    clientAllergySensitivityReducer,
    clientHeadshotReducer,
    clientProductPreferenceReducer,
    clientProfileReducer,
    clientReviewReducer,
    messageReducer,
    notificationReducer,
    sanitizationQuizReducer,
    sessionReducer,
    siteReducer,
    userReducer
});

export default rootReducer;
