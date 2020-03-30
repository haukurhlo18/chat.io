import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { updateRooms } from './actions/rooms';
import { Provider } from 'react-redux';
import irc from "./services/ircService";
import Login from './components/Login';
import IRC from './components/IRC';
import store from './store';
import './styles.css';

// Emit rooms to socket to trigger roomList update
irc.rooms();
// Update state with emitted roomList
irc.onRoomListUpdate((data) => store.dispatch(updateRooms(data)));

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Route exact path={'/'} component={Login} />
            <Route exact path={'/irc'} component={IRC} />
        </Router>
    </Provider>,
    document.body.appendChild(document.createElement("div"))
);
