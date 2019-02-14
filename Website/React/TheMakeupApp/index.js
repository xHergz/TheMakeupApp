
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import TheMakeupApp from './containers/TheMakeupApp';
import configureStore from './store/configureStore';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <TheMakeupApp />
        </HashRouter>
    </Provider>,
    document.getElementById('root')
);
