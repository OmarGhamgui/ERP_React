import {combineReducers} from 'redux';
import changeStateReducer from "./changeStateReducer"
import clientReducer from "./clientReducer"
import supplierReducer from "./supplierReducer"

export default combineReducers({
    changeStateReducer,
    clientReducer,
    supplierReducer
})

