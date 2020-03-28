import { combineReducers } from 'redux';
// reducers
import greeting from './greeting';
import accessTokenData from './auth';

// combine reducers
export default combineReducers({
  greeting,
  token: accessTokenData,
});
