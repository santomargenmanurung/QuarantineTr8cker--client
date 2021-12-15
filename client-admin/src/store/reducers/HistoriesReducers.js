import { ISLOGIN,HISTORIES_LOADING,HISTORIES_FETCH } from "../actionType/HistoriesType";

const initialState = {
  histories: [],
  isLogin: false,
  isLoading: true,
  page: 1
};

export default function historiesReducer(state = initialState, action) {
  switch (action.type) {
    case HISTORIES_FETCH:
      return {
        ...state,
        isLoading: false,
        histories: action.payload,
      };
       case ISLOGIN:
      return {
        ...state,
       isLogin: action.payload,
      };
      case HISTORIES_LOADING:
        return {
          ...state,
         isLoading: action.payload,
        };
    default:
      return state;
  }
}
