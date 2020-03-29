import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from './components/Login';
import IRC from './components/IRC';
import store from './store';
import './styles.css';

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Route exact path={'/'} component={Login} />
            <Route exact path={'/irc'} component={IRC} />
        </Router>
    </Provider>,
    document.body.appendChild(document.createElement("div"))
);
