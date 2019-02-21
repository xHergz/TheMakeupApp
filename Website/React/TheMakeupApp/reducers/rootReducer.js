
import { combineReducers } from 'redux';

import messageReducer from './MessageReducer';
import notificationReducer from './NotificationReducer';
import sessionReducer from './SessionReducer';
import siteReducer from './SiteReducer';

const rootReducer = combineReducers({
    messageReducer,
    notificationReducer,
    sessionReducer,
    siteReducer
});

export default rootReducer;
