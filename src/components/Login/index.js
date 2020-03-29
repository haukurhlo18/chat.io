import React from 'react';
import './styles.css';

const Login = () => {
    return (
        <div id={'login'}>
            <label htmlFor={'nickname'}>Nickname</label>
            <input type={'text'} id={'nickname'} placeholder={'Nickname'} />
            <button type={'submit'}>Enter</button>
        </div>
    );
};

export default Login;
