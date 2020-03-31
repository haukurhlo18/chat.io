
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

export const joinRoom = (room) => ({
    type: ChatActions.JOIN_ROOM,
    room,
});

export const updateMessages = (messages) => ({
    type: ChatActions.UPDATE_MESSAGES,
    messages,
});

export const setNick = (nick) => ({
    type: ChatActions.SET_NICK,
    nick,
});
