import { combineReducers } from "redux";
import auth from "./auth";
import product from "./product";
import orders from "./orders";

const rootReducers = combineReducers({
    auth,
    product,
    orders
});

export default rootReducers;