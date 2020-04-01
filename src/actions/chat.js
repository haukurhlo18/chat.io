import irc from '../services/ircService';
import { room as storageRoom, nick as storageNick } from '../services/storageService';

export const ChatActions = {
    UPDATE_MESSAGES: 'UPDATE_MESSAGES',
    UPDATE_ROOMS: 'UPDATE_ROOMS',
    JOIN_ROOM: 'JOIN_ROOM',
    SET_NICK: 'SET_NICK',
};

export const updateRooms = (rooms) => ({
    type: ChatActions.UPDATE_ROOMS,
    rooms: rooms,
});

export const joinRoom = (room, pass = null) => {
    return (dispatch, getState) => {
        const state = getState();
        const rooms = state.chat.rooms;
        const user = state.chat.nick;
        const currentRoom = state.chat.currentRoom;

        const roomExists = room in rooms;
        const messages = roomExists ? rooms[room].messageHistory : [];

        // if user has already in room
        if (roomExists && (user in rooms[room].ops || user in rooms[room].users)) {
            if (room !== currentRoom) {
                console.log(rooms[room]);
                dispatch(joinRoomAction(room));
                dispatch(updateMessages(messages));
            } else {
                console.log(`You can't join a room (${room}) you're already in.`)
            }
        } else {
            let roomObj = {room};
            if (pass) {
                roomObj.pass = pass;
            }

            irc.joinRoom(roomObj, (successful) => {
                if (successful) {
                    dispatch(joinRoomAction(room));
                    dispatch(updateMessages(messages));
                    if (!pass) {
                        storageRoom(room);
                    }
                    console.log( roomExists ? `Joined room: ${room}` : `Created room: ${room}`);
                } else {
                    console.log( roomExists ? `Unable to join room: ${room}` : `Unable to create room: ${room}`);
                }
            });
        }
    }
};

const joinRoomAction = (room) => ({
    type: ChatActions.JOIN_ROOM,
    currentRoom: room,
});

export const updateMessages = (room, messages) => {
    return (dispatch, getState) => {
        const state = getState();
        let rooms = state.chat.rooms;
        if (room in rooms) {
            rooms[room].messageHistory = messages;
            dispatch(updateRooms(rooms));
        }
    }
};

export const loginUser = (username) => {
    storageNick(username);
    return (dispatch) => {
        dispatch(setNick(username));
    };
};

const setNick = (nick) => ({
    type: ChatActions.SET_NICK,
    nick,
});
