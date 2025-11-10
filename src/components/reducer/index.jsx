import CartReducer from "./cartReducer";
import { combineReducers } from "redux";

const AllReducers = combineReducers({
    CartReducer,
})

export default AllReducers;