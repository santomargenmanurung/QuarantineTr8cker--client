import { LOCATION_ADD,LOCATION_FETCH,LOCATION_LOADING } from "../actionType/LocationType";
const initialState = {
  locations: [],
  isLogin: false,
  isLoading: true
};

export default function locationReducer(state = initialState, action) {
  switch (action.type) {
    case LOCATION_FETCH:
      return {
        ...state,
        locations: action.payload,
        isLoading:false
      };
      case LOCATION_LOADING:
        return {
          ...state,
       isLoading: true
        };
    default:
      return state;
  }
}
