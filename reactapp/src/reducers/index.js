import { combineReducers } from "redux";
import auth from "./auth";
import product from "./product";

const rootReducers = combineReducers({
    auth,
    product
});

export default rootReducers;