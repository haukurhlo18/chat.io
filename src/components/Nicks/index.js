import React from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';

const Nicks = ({ users, ops, nick }) => {

    ops = Object.keys(ops).filter(n => n !== nick);
    users = Object.keys(users).filter(n => n !== nick);

    return (
        <div>
            { ops.map( nick => <div key={nick} className={'nick op'}>{nick}</div>) }
            { users.map( nick => <div key={nick} className={'nick'}>{nick}</div>) }
        </div>
    );
};

Nicks.propTypes = {
    users: PropTypes.object.isRequired,
    ops: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    const currentRoom = state.chat.currentRoom.room;
    let nicks = {
        users: {},
        ops: {},
        nick: state.chat.nick,
    };

    if (currentRoom !== '') {
        nicks.users = state.chat.rooms[currentRoom].users;
        nicks.ops = state.chat.rooms[currentRoom].ops;
    }

    return nicks;
};

export default connect(
    mapStateToProps,
    null,
)(Nicks);
