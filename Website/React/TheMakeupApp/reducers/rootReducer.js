
import { combineReducers } from 'redux';

import messageReducer from './MessageReducer';
import notificationReducer from './NotificationReducer';
import sessionReducer from './SessionReducer';
import siteReducer from './SiteReducer';
import userReducer from './UserReducer';

const rootReducer = combineReducers({
    messageReducer,
    notificationReducer,
    sessionReducer,
    siteReducer,
    userReducer
});

export default rootReducer;
