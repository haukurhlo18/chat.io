import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { joinRoom } from '../../actions/chat';
import './styles.css';

const Room = ({ room, locked, selectedRoom, joinRoom }) => {
    const enter = () => {
        let request = {
            room,
        };

        if (locked) {
            request.pass = prompt(`Please enter password for '${room}'`);
        }

        joinRoom(request);
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
    joinRoom: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        selectedRoom: state.chat.selectedRoom,
    }
};

const mapDispatchToProps = (dispatch) => ({
    joinRoom: (room) => dispatch(joinRoom(room)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Room);
