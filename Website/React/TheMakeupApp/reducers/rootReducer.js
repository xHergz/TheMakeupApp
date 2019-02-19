
import { combineReducers } from 'redux';

import messageReducer from './MessageReducer';
import sessionReducer from './SessionReducer';
import siteReducer from './SiteReducer';

const rootReducer = combineReducers({
    messageReducer,
    sessionReducer,
    siteReducer
});

export default rootReducer;
