import { combineReducers } from "redux";
import categoryReducer from "./catReducer";
import itemReducer from "./itemReducer";

export default combineReducers({
  quarantine: itemReducer,
  genre: categoryReducer,
});
