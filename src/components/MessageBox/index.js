import React, { useState } from 'react';
import irc from '../../services/ircService';
import { connect } from 'react-redux';
import './styles.css';
import PropTypes from "prop-types";

const MessageBox = ({ selectedRoom }) => {
    const [ message, setMessage ] = useState('');

    const send = (e) => {
        // Prevent form being submitted
        e.preventDefault();

        // If the message is empty or we're not in a room, then we quit early
        if (message === '' || selectedRoom === '') {
            return;
        }

        // Send message
        irc.sendMsg(selectedRoom, message);

        // Clear message box
        setMessage('');
    };

    return (
        <form id={'message-box'} onSubmit={e => send(e)}>
            <input type={'text'} placeholder={'Enter message...'} value={message} onChange={ e => setMessage(e.target.value) } />
            <button type={'submit'}>Send</button>
        </form>
    );
};

MessageBox.propTypes = {
    selectedRoom: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
    return {
        selectedRoom: state.chat.selectedRoom,
    }
};

export default connect(
    mapStateToProps,
    null,
)(MessageBox);
