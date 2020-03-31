import React from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';

const Nicks = ({ users, ops }) => {

    return (
        <div>
            { Object.keys(ops).map( nick => <div key={nick} className={'nick op'}>{nick}</div>) }
            { Object.keys(users).map( nick => <div key={nick} className={'nick'}>{nick}</div>) }
        </div>
    );
};

Nicks.propTypes = {
    users: PropTypes.object.isRequired,
    ops: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    const currentRoom = state.chat.currentRoom;
    let nicks = {
        users: {},
        ops: {},
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
