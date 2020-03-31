import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { joinRoom, updateMessages } from '../../actions/chat';
import { clearRoom } from '../../services/storageService';
import irc from "../../services/ircService";
import './styles.css';

const Room = ({ room, locked, currentRoom, joinRoom, updateMessages }) => {
    const enter = () => {
        if (room === currentRoom) {
            irc.partRoom(room);
            joinRoom({ room: '', pass: '' });
            updateMessages([]);
            clearRoom();
            return;
        }

        let request = {
            room,
        };

        if (locked) {
            request.pass = prompt(`Please enter password for '${room}'`);
        }

        irc.joinRoom(request, (accepted) => {
            if (accepted) {
                joinRoom(request);
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
        </div>
    );
};

Room.propTypes = {
    room: PropTypes.string.isRequired,
    locked: PropTypes.bool.isRequired,
    currentRoom: PropTypes.string.isRequired,
    joinRoom: PropTypes.func.isRequired,
    updateMessages: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        currentRoom: state.chat.currentRoom.room,
    }
};

const mapDispatchToProps = (dispatch) => ({
    joinRoom: (room) => dispatch(joinRoom(room)),
    updateMessages: (messages) => dispatch(updateMessages(messages)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Room);
