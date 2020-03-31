import { applyMiddleware, createStore } from 'redux';
import { ChatActions, updateMessages, updateRooms } from './actions/chat';
import { nick as storageNick, room as storageRoom } from './services/storageService';
import rootReducer from './reducers';
import irc from './services/ircService';

const logger = store => next => action => {
    console.group(action.type);
    console.info('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    console.groupEnd();
    return result
};

const chatMiddleware = store => next => action => {
    switch (action.type) {
        case ChatActions.SET_NICK:
            storageNick(action.nick);
            return next(action);
        case ChatActions.JOIN_ROOM:
            storageRoom(action.currentRoom);
            return next(action);
        default:
            return next(action);
    }
};

const store = createStore(
    rootReducer,
    applyMiddleware(
        // logger,
        chatMiddleware,
    ),
);

// Emit rooms to socket to trigger roomList update
irc.rooms();
// Update state with emitted roomList
irc.onRoomListUpdate((data) => store.dispatch(updateRooms(data)));

irc.onChatUpdate((messages, room) => {
    store.dispatch(updateMessages(messages));
});

export default store;
