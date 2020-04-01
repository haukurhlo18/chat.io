import React from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import './styles.css';

const Nicks = ({ users, ops, you }) => {

    ops = Object.keys(ops);
    users = Object.keys(users);

    return (
        <div id={'nicks'}>
            { ops.map( nick => <div key={nick} className={ nick === you ? 'nick op you' : 'nick op' }>{nick}</div>) }
            { users.map( nick => <div key={nick} className={ nick === you ? 'nick you' : 'nick' }>{nick}</div>) }
        </div>
    );
};

Nicks.propTypes = {
    users: PropTypes.object.isRequired,
    ops: PropTypes.object.isRequired,
    you: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
    const currentRoom = state.chat.currentRoom.room;
    let nicks = {
        users: {},
        ops: {},
        you: state.chat.nick,
    };

    if (currentRoom !== '' && currentRoom in state.chat.rooms) {
        nicks.users = state.chat.rooms[currentRoom].users;
        nicks.ops = state.chat.rooms[currentRoom].ops;
    }

    return nicks;
};

export default connect(
    mapStateToProps,
    null,
)(Nicks);
