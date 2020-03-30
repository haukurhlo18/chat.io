import { combineReducers } from 'redux';
import rooms from './rooms';
import chat from './chat';

export default combineReducers({
   rooms,
   chat,
});
