import { ChatActions } from '../actions/chat';

const chat = (state = { messages: [], nick: '' , rooms: {}, currentRoom: { room: '', pass: '' } }, action) => {
    switch (action.type) {
        case ChatActions.UPDATE_MESSAGES:
            return {
                ...state,
                messages: action.messages,
            };
        case ChatActions.SET_NICK:
            return {
                ...state,
                nick: action.nick,
            };
        case ChatActions.UPDATE_ROOMS:
            return {
                ...state,
                rooms: action.rooms,
            };
        case ChatActions.JOIN_ROOM:
            return {
                ...state,
                currentRoom: action.currentRoom,
            };
        default:
            return state;
    }
};

export default chat;
