import { HISTORIES_LOADING,HISTORIES_FETCH } from "../actionType/HistoriesType";

const initialState = {
  histories: [],
  isLogin: false,
};

export default function historiesReducer(state = initialState, action) {
  switch (action.type) {
    case HISTORIES_FETCH:
      return {
        ...state,
        histories: action.payload,
      };
    default:
      return state;
  }
}
