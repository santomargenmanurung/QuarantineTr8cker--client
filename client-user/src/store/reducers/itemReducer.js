import {
  ITEMS_LOADING,
  QUARLIST,
  ISLOGIN,
  DELETEMOVIE,
  ADD_MOVIE,
} from "../actionType/itemActionType";

const initialState = {
  quarantineList: [],
  singleData: {},
  isLoading: true,
  isLogin: false,
  error: null,
};

export default function itemReducer(state = initialState, action) {
  switch (action.type) {
    case QUARLIST:
      return {
        ...state,
        isLoading: false,
        quarantineList: action.payload,
      };
    case ITEMS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case ISLOGIN:
      return {
        ...state,
        isLogin: action.payload,
      };
    case DELETEMOVIE:
      const result = state.movies.filter((e) => e.id != action.payload);
      return {
        ...state,
        isLoading: false,
        movies: result,
      };
    case ADD_MOVIE:
      return {
        ...state,
        isLoading: false,
        movies: action.payload,
      };
    default:
      return state;
  }
}
