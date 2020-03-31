import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import IRC from './components/IRC';
import store from './store';
import './styles.css';

ReactDOM.render(
    <Provider store={store}>
        <IRC/>
    </Provider>,
    document.body.appendChild(document.createElement("div"))
);
