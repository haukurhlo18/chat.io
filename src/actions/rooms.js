
export const RoomsActions = {
    GET_ROOMS: 'GET_ROOMS',
    REQUEST: 'REQUEST',
    RECEIVE: 'RECEIVE',
    INVALIDATE: 'INVALIDATE',
    SELECT_ROOM: 'SELECT_ROOM',
};

function requestRooms() {
    return {
        type: RoomsActions.REQUEST,
        isFetching: true,
    };
}

function receiveRooms(json) {
    return {
        type: RoomsActions.RECEIVE,
        isFetching: false,
        rooms: json,
        receivedAt: Date.now(),
    };
}

export const invalidateRooms = () => ({
    type: RoomsActions.INVALIDATE,
    didInvalidate: true,
});

export const selectRoom = (room) => ({
    type: RoomsActions.SELECT_ROOM,
    room,
});

function shouldFetch(getState) {
    const state = getState();
    const { rooms } = state;
    if (!rooms || rooms.rooms.length === 0) {
        return true;
    }
    if (rooms.isFetching) {
        return false;
    }
    return rooms.invalidated;
}

export const fetchRoomsFromAPI = () => (dispatch, getState) => {
    if (shouldFetch(getState)) {
        dispatch(requestRooms());
        // getCinemasAsync()
        //     .then((json) => dispatch(receiveCinemas(json)));
    }
};
