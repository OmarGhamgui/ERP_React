import {combineReducers} from 'redux';
import changeStateReducer from "./changeStateReducer"
import clientReducer from "./clientReducer"

export default combineReducers({
    changeStateReducer,
    clientReducer,
})

