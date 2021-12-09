import {
  CATEGORIES_LOADING,
  SET_GENRES,
  ADD_GENRE,
  DELETE_GENRE,
} from "../actionType/catActionType";

const initialState = {
  genres: [],
  singleData: {},
  isLoading: true,
  error: null,
};

export default function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case SET_GENRES:
      return {
        ...state,
        isLoading: false,
        genres: action.payload,
      };
    case CATEGORIES_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case ADD_GENRE:
      let temp = state.genres;
      temp.push(action.payload);
      return {
        ...state,
        genres: temp,
      };
    case DELETE_GENRE:
      const result = state.genres.filter((e) => e.id != action.payload);
      return {
        ...state,
        genres: result,
      };
    default:
      return state;
  }
}
