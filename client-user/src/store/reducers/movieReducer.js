import { MOVIES, LOGIN, DETAIL } from "../actionType";

const initialState = {
  movies: [],
  details: [],
  isLogin: false,
};

export default function counterReducer(state = initialState, action) {
  switch (action.type) {
    case MOVIES:
      return {
        ...state,
        movies: action.payload,
      };
    case LOGIN:
      return {
        ...state,
        isLogin: action.payload,
      };
    case DETAIL:
      return {
        ...state,
        details: action.payload,
      };
    default:
      return state;
  }
}
