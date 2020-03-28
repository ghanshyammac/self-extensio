import { GREETING } from '../actions/greeting';

const initState = { message: 'Hello' };

export default (state = initState, action) => {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case GREETING:
      newState = { message: action.message };
      return newState;
    default:
      return newState;
  }
};
