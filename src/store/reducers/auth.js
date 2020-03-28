import * as actions from '../actions/auth';

const accessTokenState = {
  accessToken: '',
};
const accessTokenData = (state = accessTokenState, action) => {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case actions.SET_ACCESS_TOKEN: {
      newState = {
        ...state,
        accessToken: action.payload
      };
      return newState;
    }
    default:
      return newState;
  }
};
export default accessTokenData;
