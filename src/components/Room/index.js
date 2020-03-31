import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { joinRoom } from '../../actions/chat';
import irc from "../../services/ircService";
import './styles.css';

const Room = ({ room, locked, currentRoom, joinRoom }) => {
    const enter = () => {
        let request = {
            room,
        };

        if (locked) {
            request.pass = prompt(`Please enter password for '${room}'`);
        }

        if (room === currentRoom) {
            return;
        }

        irc.joinRoom(request, (accepted) => {
            if (accepted) {
                joinRoom(room);
                console.log(`Joined room: ${room}`);
            } else {
                console.log(`Unable to join room: ${room}`);
            }
        });
    };

    let classes = ['room'];

    if (room === currentRoom) {
        classes.push('current');
    }

    return (
        <div className={ classes.join(' ') } onClick={ enter }>
            <span className={'room_name'}>{ room }</span>
            <span className={'room_locked'}>{ locked ? '🛑' : '✅' }</span>
        </div>
    );
};

Room.propTypes = {
    room: PropTypes.string.isRequired,
    locked: PropTypes.bool.isRequired,
    currentRoom: PropTypes.string.isRequired,
    joinRoom: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        currentRoom: state.chat.currentRoom,
    }
};

const mapDispatchToProps = (dispatch) => ({
    joinRoom: (room) => dispatch(joinRoom(room)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Room);
