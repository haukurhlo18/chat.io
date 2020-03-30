
export const ChatActions = {
    UPDATE_MESSAGES: 'UPDATE_MESSAGES',
    SET_NICK: 'SET_NICK',
};

export const updateMessages = (messages) => ({
    type: ChatActions.UPDATE_MESSAGES,
    messages,
});

export const setNick = (nick) => ({
    type: ChatActions.SET_NICK,
    nick,
});
