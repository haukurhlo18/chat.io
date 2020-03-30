import { socket } from '../services/ircService';

export const RoomsActions = {
    UPDATE_ROOMS: 'UPDATE_ROOMS',
    JOIN_ROOM: 'JOIN_ROOM',
    LEAVE_ROOM: 'LEAVE_ROOM',
};

export const updateRooms = (rooms) => ({
    type: RoomsActions.UPDATE_ROOMS,
    rooms: rooms,
});

export const joinRoom = (room) => ({
    type: RoomsActions.JOIN_ROOM,
    room,
});
