import { applyMiddleware, createStore } from 'redux';
import { updateMessages, updateRooms, loginUser, joinRoom } from './actions/chat';
import { nick as storageNick, room as storageRoom } from './services/storageService';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import irc from './services/ircService';


const store = createStore(
    rootReducer,
    applyMiddleware(
        thunk,
    ),
);

// Emit rooms to socket to trigger roomList update
irc.rooms();
// Update state with emitted roomList
irc.onRoomListUpdate((data) => store.dispatch(updateRooms(data)));

irc.onChatUpdate((room, messages) => {
    store.dispatch(updateMessages(room, messages));
});

irc.onUsersUpdate( () => {
    // Let's just update all the rooms, because we're lazy and redux sucks
    irc.rooms();
});

const nickname = storageNick();
if (nickname !== null) {
    irc.addUser(nickname, (available) => {
        if (available) {
            store.dispatch(loginUser(nickname));
            console.log(`Automatically logged in as ${nickname}`);
            const room = storageRoom();
            if (room !== null) {
                store.dispatch(joinRoom(room));
            }
        }
    });
}

export default store;
