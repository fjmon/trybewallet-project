// Esse reducer será responsável por tratar as informações da pessoa usuária
import { SET_EMAIL } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const userRed = (
  state = INITIAL_STATE,
  action,
) => {
  switch (action.type) {
  case SET_EMAIL:
    return {
      ...state,
      email: action
        .payload,
    };
  default:
    return state;
  }
};
export default userRed;
