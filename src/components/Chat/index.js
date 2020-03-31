import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './styles.css';

const Chat = ({ messages }) => {

    const toHumanReadable = (timestamp) => {
        let d = new Date(timestamp);
        return d.getUTCHours() + ':' + d.getUTCMinutes();
    };

    return (
        <div id={'chat'}>
            { messages.map((data, i) => (
                <div key={i} className={'message'}>
                    <span className={'chat_nick'}>{ data.nick }</span>
                    <span className={'chat_timestamp'}>{ toHumanReadable(data.timestamp) }</span>
                    <span className={'chat_message'}>{ data.message }</span>
                </div>
            )) }
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
