import React from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import MessageBox from '../MessageBox';
import Nicks from '../Nicks';
import Rooms from '../Rooms';
import Login from "../Login";
import Chat from '../Chat';
import './styles.css';

const IRC = ({ nick }) => {
    if (nick !== '') {
        return (
            <div id={'irc'}>
                <Rooms/>
                <Chat/>
                <Nicks/>
                <MessageBox/>
            </div>
        );
    } else {
        return (<Login />);
    }
};


IRC.propTypes = {
    nick: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
    return {
        nick: state.chat.nick,
    }
};

export default connect(
    mapStateToProps,
    null,
)(IRC);
