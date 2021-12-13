import { USER_ADD,USER_FETCH,USER_LOADING } from "../actionType/UserTypes";

const initialState = {
  users: [],
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_FETCH:
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
}
