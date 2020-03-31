import { ChatActions } from '../actions/chat';

const chat = (state = { messages: [], nick: '' , rooms: {}, selectedRoom: '' }, action) => {
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
                selectedRoom: action.room,
            };
        default:
            return state;
    }
};

export default chat;
