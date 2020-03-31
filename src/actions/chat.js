
export const ChatActions = {
    UPDATE_MESSAGES: 'UPDATE_MESSAGES',
    UPDATE_ROOMS: 'UPDATE_ROOMS',
    UPDATE_ROOM: 'UPDATE_ROOM',
    JOIN_ROOM: 'JOIN_ROOM',
    SET_NICK: 'SET_NICK',
};

export const updateRooms = (rooms) => ({
    type: ChatActions.UPDATE_ROOMS,
    rooms: rooms,
});

export const updateRoom = (room, users, ops) => ({
    type: ChatActions.UPDATE_ROOM,
    room,
    users,
    ops,
});

export const joinRoom = (room) => ({
    type: ChatActions.JOIN_ROOM,
    currentRoom: room,
});

export const updateMessages = (messages) => ({
    type: ChatActions.UPDATE_MESSAGES,
    messages,
});

export const setNick = (nick) => ({
    type: ChatActions.SET_NICK,
    nick,
});
