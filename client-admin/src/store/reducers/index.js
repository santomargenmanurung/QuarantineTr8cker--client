import { combineReducers } from "redux";
import historiesReducer from "./HistoriesReducers";
import changeState from "./SidbarReducer";
import locationReducer from "./LocationReducer";
import userReducer from "./UserReducers";
const reducers = combineReducers({
    changeState,
    historiesReducer
    , locationReducer,
    userReducer
})
export default reducers