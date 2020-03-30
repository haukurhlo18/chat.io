import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { joinRoom } from '../../actions/rooms';
import irc from '../../services/ircService';
import './styles.css';

const Room = ({ room, locked, selectedRoom, join }) => {
    const enter = () => {
        let request = {
            room,
        };

        if (locked) {
            request.pass = prompt(`Please enter password for '${room}'`);
        }

        irc.joinRoom(request, (accepted, reason) => {
            if (accepted) {
                join(room);
            }
        });
    };

    let classes = ['room'];

    if (room === selectedRoom) {
        classes.push('selected');
    }

    return (
        <div className={classes.join(' ')} onClick={enter}>
            <span className={'room_name'}>{room}</span>
            <span className={'room_locked'}>{ locked ? '🛑' : '✅' }</span>
        </div>
    );
};

Room.propTypes = {
    room: PropTypes.string.isRequired,
    locked: PropTypes.bool.isRequired,
    selectedRoom: PropTypes.string.isRequired,
    join: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        selectedRoom: state.rooms.selectedRoom,
    }
};

const mapDispatchToProps = (dispatch) => ({
    join: (room) => dispatch(joinRoom(room)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Room);
