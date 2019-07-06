import { AUTH_ERROR, LOGIN, LOGOUT,LOGGING,AUTH_USER } from "../actions/types";

export default (state = { authenticated: false }, action) => {
  switch (action.type) {
    case LOGGING :
      return state;
    case LOGIN:
      return { ...state, authenticated: true };
    case LOGOUT:
      return { ...state, authenticated: false };
    case AUTH_USER:
      return {...state,user:action.payload}
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
