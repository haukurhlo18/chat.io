import React, { useState } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/chat';
import irc from '../../services/ircService';
import logo from '../../assets/images/logo.png';
import './styles.css';

const Login = ({ loginUser }) => {

    const [ nickname, setNickname ] = useState('');
    const [ inputError, setInputError ] = useState('');

    const login = (e) => {
        e.preventDefault();
        if (nickname === '') {
            setInputError('Nickname cannot be empty!');
            return;
        }

        irc.addUser(nickname, (available) => {
            if (available) {
                loginUser(nickname);
            } else {
                setInputError(`Nickname '${nickname}' is not available`);
            }
        });
    };

    return (
        <div id={'login'}>
            <div>
                <img src={logo} className={'logo'} />
                <form onSubmit={e => login(e)}>
                    <label htmlFor={'nickname'}>Nickname</label>
                    <input type={'text'} id={'nickname'} placeholder={'Nickname'} onChange={ e => setNickname(e.target.value) } autoFocus={true} />
                    { inputError && <span className={'input_error'}>{ inputError }</span> }
                    <button type={'submit'}>Enter chat</button>
                </form>
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    loginUser: (room) => dispatch(loginUser(room)),
});

export default connect(
    null,
    mapDispatchToProps,
)(Login);