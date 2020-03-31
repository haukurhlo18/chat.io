import React from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';

const Nicks = ({ rooms, currentRoom }) => {

    let nicks = {
        ops: [],
        users: [],
    };

    if (currentRoom !== '') {
        nicks.ops = Object.keys(rooms[currentRoom].ops);
        nicks.users = Object.keys(rooms[currentRoom].users);
    }

    return (
        <div>
            { nicks.ops.map( nick => <div key={nick} className={'nick op'}>{nick}</div>) }
            { nicks.users.map( nick => <div key={nick} className={'nick'}>{nick}</div>) }
        </div>
    );
};

Nicks.propTypes = {
    rooms: PropTypes.object.isRequired,
    currentRoom: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
    return {
        rooms: state.chat.rooms,
        currentRoom: state.chat.currentRoom,
    }
};

export default connect(
    mapStateToProps,
    null,
)(Nicks);
