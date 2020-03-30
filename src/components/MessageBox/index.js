import React, { useState } from 'react';
import irc from '../../services/ircService';
import { connect } from 'react-redux';
import './styles.css';
import PropTypes from "prop-types";

const MessageBox = ({ selectedRoom }) => {
    const [ message, setMessage ] = useState('');

    const send = (e) => {
        e.preventDefault();
        if (message === '' || selectedRoom === '') {
            return;
        }

        irc.sendMsg(selectedRoom, message);
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
        selectedRoom: state.rooms.selectedRoom,
    }
};

export default connect(
    mapStateToProps,
    null,
)(MessageBox);
