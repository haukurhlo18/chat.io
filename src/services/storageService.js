
const NICK = 'nick';
const SELECTED_ROOM = 'room';

const storage = (key, value = null) => {
    if (value) {
        localStorage.setItem(key, value);
    }

    return localStorage.getItem(key);
};

export const nick = (nickname = null) => storage(NICK, nickname);
export const room = (room = null) => storage(SELECTED_ROOM, room);
