import React, { useState } from 'react';
import { socket } from '../../services/socketService';
import logo from '../../assets/images/logo.png';
import './styles.css';

const Login = () => {

    const [ nickname, setNickname ] = useState('');

    const login = () => {
        if (nickname === '') {
            return;
        }

        socket.emit("adduser", nickname, (available) => {
            if (available){
                console.log(`The ${nickname} is available`);
            } else {
                console.log(`The ${nickname} is NOT available`);
            }
        });
    };

    return (
        <div id={'login'}>
            <div>
                <img src={logo} className={'logo'} />
                <form onSubmit={login}>
                    <label htmlFor={'nickname'}>Nickname</label>
                    <input type={'text'} id={'nickname'} placeholder={'Nickname'} onChange={ e => setNickname(e.target.value) } />
                    <button type={'submit'} onClick={login}>Enter chat</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
