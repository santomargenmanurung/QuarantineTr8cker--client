import { LOCATION_ADD,LOCATION_FETCH,LOCATION_LOADING } from "../actionType/LocationType";
const initialState = {
  locations: [],
  isLogin: false,
};

export default function locationReducer(state = initialState, action) {
  switch (action.type) {
    case LOCATION_FETCH:
      return {
        ...state,
        locations: action.payload,
      };
    default:
      return state;
  }
}
