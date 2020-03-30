import { RoomsActions } from '../actions/rooms';

const rooms = (state = { rooms: {}, selectedRoom: '' }, action) => {
    switch (action.type) {
        case RoomsActions.UPDATE_ROOMS:
            return {
                ...state,
                rooms: action.rooms,
            };
        case RoomsActions.JOIN_ROOM:
            return {
                ...state,
                selectedRoom: action.room,
            };
        default:
            return state;
    }
};

export default rooms;
