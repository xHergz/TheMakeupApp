import {
    applyMiddleware,
    createStore
} from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducers/rootReducer';

const mapStoreToStorage = () =>
	localStorage.setItem('reduxState', JSON.stringify(store.getState()));

const persistedState = localStorage.getItem('reduxState')
    ? JSON.parse(localStorage.getItem('reduxState'))
  	: {
  		rooms: [],
  		video: true,
  		audio: true
};

export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk)
    );
}
