import { combineReducers } from "redux";
import auth from "./auth";
import product from "./product";
import orders from "./orders";
import cart from "./cart";

const rootReducers = combineReducers({
    auth,
    product,
    orders,
    cart
});

export default rootReducers;