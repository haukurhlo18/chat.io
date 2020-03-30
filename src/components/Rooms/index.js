import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Room from "../Room";

const Rooms = ({ rooms }) => {
    const keys = Object.keys(rooms);

    return (
        <div id={'rooms'}>
            { keys.map(room => <Room key={room} room={room} locked={rooms[room].locked} />) }
        </div>
    );
};

Rooms.propTypes = {
    rooms: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        rooms: state.rooms.rooms,
    }
};

export default connect(
    mapStateToProps,
    null,
)(Rooms);
