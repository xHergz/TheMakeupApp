
import { combineReducers } from 'redux';

import messageReducer from './MessageReducer';
import sessionReducer from './SessionReducer';

const rootReducer = combineReducers({
    messageReducer,
    sessionReducer
});

export default rootReducer;
