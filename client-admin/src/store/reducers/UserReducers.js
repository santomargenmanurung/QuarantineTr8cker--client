import { USER_ADD,USER_FETCH,USER_LOADING } from "../actionType/UserTypes";

const initialState = {
  users: [],
  isLoading: true
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_FETCH:
      return {
        ...state,
        isLoading: false,
        users: action.payload,
      };
      case USER_LOADING:
        return {
          ...state,
         isLoading: action.payload,
        };
    default:
      return state;
  }
}
