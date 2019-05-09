import { AUTH_ERROR, LOGIN, LOGOUT } from "../actions/types";

export default (state = { authenticated: false }, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, authenticated: true };
    case LOGOUT:
      return { ...state, authenticated: false };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
