import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './styles.css';

const Chat = ({ messages }) => {
    console.log(messages);
    return (
        <div id={'chat'}>
            Here are the Chat displayed
        </div>
    );
};

Chat.propTypes = {
    messages: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
    return {
        messages: state.chat.messages,
    }
};

export default connect(
    mapStateToProps,
    null,
)(Chat);
