import { RoomsActions } from '../actions/rooms';

const rooms = (state = { isFetching: false, invalidated: false, rooms: [] }, action) => {
    switch (action.type) {
        case RoomsActions.GET_ROOMS:
            return {
                ...state,
                selected: action.room,
            };
        case RoomsActions.RECEIVE:
        case RoomsActions.REQUEST:
            return {
                ...state,
                ...action,
            };
        case RoomsActions.INVALIDATE:
            return {
                ...state,
                invalidated: action.didInvalidate,
            };
        default:
            return state;
    }
};

export default rooms;
