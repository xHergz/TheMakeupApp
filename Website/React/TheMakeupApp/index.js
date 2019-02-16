
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import TheMakeupApp from './containers/TheMakeupApp';
import configureStore from './store/configureStore';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <TheMakeupApp />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
