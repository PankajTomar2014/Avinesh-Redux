import types from "../types";
import { REHYDRATE } from 'redux-persist/lib/constants'


const initial_state = {
  userData: null,
}

export default (state = initial_state, action) => {
  switch (action.type) {
    case types.LOGIN:
      // debugger
      return { ...state, userData: { ...action.payload }, };

      case "LOGOUT_SUCCESS":
        // debugger
        return { ...state, userData: null, };

    case REHYDRATE: {
      if (action.payload) {
        return { ...state, ...action.payload.auth }
      }
    }
    default:
      return state;
  }
};