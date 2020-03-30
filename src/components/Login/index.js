import React, { useState } from 'react';
import irc from '../../services/ircService';
import { Redirect } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import './styles.css';

const Login = () => {

    const [ nickname, setNickname ] = useState('');
    const [ inputError, setInputError ] = useState('');
    const [ goToIRC, setGoToIRC ] = useState(false);

    const login = (e) => {
        e.preventDefault();
        if (nickname === '') {
            setInputError('Nickname cannot be empty!');
            return;
        }

        irc.addUser(nickname, (available, r) => {
            console.log(available, r);
            if (available) {
                setGoToIRC(true);
            } else {
                setInputError(`Nickname '${nickname}' is not available`);
            }
        });
    };

    return (
        <div id={'login'}>
            { goToIRC && <Redirect to={'/irc'} /> }
            <div>
                <img src={logo} className={'logo'} />
                <form onSubmit={e => login(e)}>
                    <label htmlFor={'nickname'}>Nickname</label>
                    <input type={'text'} id={'nickname'} placeholder={'Nickname'} onChange={ e => setNickname(e.target.value) } />
                    { inputError && <span className={'input_error'}>{ inputError }</span> }
                    <button type={'submit'}>Enter chat</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
