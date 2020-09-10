import { AUTHENTICATE, LOGOUT } from "../actions/auth";

const initialState = {
  token: null,
  username: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        username: action.username,
      };

    case LOGOUT:
      return {
        token: null,
        username: null,
      };

    default:
      return state;
  }
};
