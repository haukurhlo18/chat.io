import { ChatActions } from '../actions/chat';

const chat = (state = { messages: [], nick: '' }, action) => {
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
        default:
            return state;
    }
};

export default chat;
