
import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom'
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import styles from '../Common/styles/Chat.css'
import TheMakeupApp from './containers/TheMakeupApp';
import configureStore from './store/configureStore';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <TheMakeupApp>
            <Switch>
                
            </Switch>
            </TheMakeupApp>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
