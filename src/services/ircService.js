import PropTypes from 'prop-types';
import connectToSocketIOServer from 'socket.io-client';

const socket = connectToSocketIOServer('http://localhost:8080');

const addUser = (nickname, callback) => socket.emit('adduser', nickname, callback);

addUser.propTypes = {
    nickname: PropTypes.string.isRequired,
    callback: PropTypes.func,
};

addUser.defaultProps = {
    callback: () => {},
};

const rooms = () => socket.emit('rooms');
rooms.propTypes = {};

const joinRoom = (room, callback) => socket.emit('joinroom', room, callback);

joinRoom.propTypes = {
    room: PropTypes.exact({
        room: PropTypes.string.isRequired,
        pass: PropTypes.string,
    }).isRequired,
    callback: PropTypes.func,
};

joinRoom.defaultProps = {
    callback: () => {},
};

const partRoom = (room) => socket.emit('partroom', room);

partRoom.propTypes = {
    room: PropTypes.string.isRequired,
};

const sendMsg = (roomName, msg) => socket.emit('sendmsg', {roomName, msg});

sendMsg.propTypes = {
    roomName: PropTypes.string.isRequired,
    msg: PropTypes.string.isRequired,
};

const privateMsg = (nick, msg, callback) => socket.emit('privatemsg', {nick, msg}, callback);

privateMsg.propTypes = {
    nick: PropTypes.string.isRequired,
    msg: PropTypes.string.isRequired,
    callback: PropTypes.func,
};

privateMsg.defaultProps = {
    callback: () => {},
};

const kick = (user, room, callback) => socket.emit('kick', {user, room}, callback);

kick.propTypes = {
    user: PropTypes.string.isRequired,
    room: PropTypes.string.isRequired,
    callback: PropTypes.func,
};

kick.defaultProps = {
    callback: () => {},
};

const onRoomListUpdate = (callback) => socket.on('roomlist', (data) => callback(data));

onRoomListUpdate.propTypes = {
    callback: PropTypes.func,
};

const onChatUpdate = (callback) => socket.on('updatechat', (data) => callback(data));

onChatUpdate.propTypes = {
    callback: PropTypes.func,
};

const irc = {
    socket,
    addUser,
    rooms,
    joinRoom,
    partRoom,
    sendMsg,
    privateMsg,
    kick,
    onRoomListUpdate,
    onChatUpdate,
};

export default irc;
