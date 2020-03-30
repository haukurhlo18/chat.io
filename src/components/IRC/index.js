import React, { useState, useEffect } from 'react';
import Rooms from "../Rooms";
import Chat from "../Chat";
import Nicks from "../Nicks";
import MessageBox from "../MessageBox";
import './styles.css';

const IRC = () => {

    useEffect(() => {
        // socket.emit('rooms');
        // socket.on('roomlist', (data) => console.log(data));
    });

    return (
        <div id={'irc'}>
            <Rooms/>
            <Chat/>
            <Nicks/>
            <MessageBox/>
        </div>
    );
};

export default IRC;
