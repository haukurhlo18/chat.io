import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { joinRoom } from '../../actions/chat';
import irc from '../../services/ircService';
import './styles.css';

const MessageBox = ({ currentRoom, joinRoom }) => {
    const [ message, setMessage ] = useState('');

    const send = (e) => {
        // Prevent form being submitted
        e.preventDefault();

        // If the message is empty or we're not in a room, then we quit early
        if (message === '' || currentRoom === '') {
            return;
        }

        let command = null;
        if (message[0] === '/') {
            // The beauty of JavaScript; is ugly one liners
            const args = message.slice(1).split(' ').map(e => e.trim()).filter(e => e !== '');

            if (args.length >= 2 && ['kick', 'ban', 'room', 'op', 'deop'].includes(args[0])) {
                command = args[0];

                switch (command) {
                    case 'room':
                        const roomObj = {
                            room: args[1],
                            pass: args[2] ? args[2] : '',
                        };
                        irc.joinRoom(roomObj, (accepted) => {
                            if (accepted) {
                                joinRoom(roomObj);
                                console.log(`Created room: ${args[1]}`);
                            } else {
                                alert(`Unable to join/create room ${args[1]}`);
                            }
                        });
                        break;
                    case 'kick':
                        break;
                    case 'op':
                        irc.op(args[1], currentRoom, (successful) => {
                            if (successful) {
                                alert(`${args[1]} has been promoted`);
                            } else {
                                alert(`Unable to promote ${args[1]}`);
                            }
                        });
                        break;
                    case 'deop':
                        irc.deop(args[1], currentRoom, (successful) => {
                            if (successful) {
                                alert(`${args[1]} has been demoted`);
                            }
                        });
                        break;
                    default:
                        break;
                }
            }
        }

        if (!command) {
            // Send message
            irc.sendMsg(currentRoom, message);
        }

        // Clear message box
        setMessage('');
    };

    const disabled = currentRoom === '';

    return (
        <form id={'message-box'} onSubmit={e => send(e)}>
            <input type={'text'} placeholder={'Enter message...'} value={message} onChange={ e => setMessage(e.target.value) } disabled={disabled} />
            <button type={'submit'} disabled={disabled}>Send</button>
        </form>
    );
};

MessageBox.propTypes = {
    currentRoom: PropTypes.string.isRequired,
    joinRoom: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        currentRoom: state.chat.currentRoom.room,
    }
};

const mapDispatchToProps = (dispatch) => ({
    joinRoom: (room) => dispatch(joinRoom(room)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MessageBox);
