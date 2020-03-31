
const NICK = 'nick';
const SELECTED_ROOM = 'room';

const storage = (key, value = null) => {
    if (value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    return JSON.parse(localStorage.getItem(key));
};

const del = key => {
    localStorage.removeItem(key);
};

export const nick = (nickname = null) => storage(NICK, nickname);
export const room = (room = null) => storage(SELECTED_ROOM, room);
export const clearNick = () => del(NICK);
export const clearRoom = () => del(SELECTED_ROOM);
