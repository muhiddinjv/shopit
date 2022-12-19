import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";
// import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
  productReducers,
  productDetailsReducers,
} from "./reducers/productReducers";

import { authReducer } from "./reducers/userReducers";

const rootReducer = combineReducers({
  products: productReducers,
  productDetails: productDetailsReducers,
  auth: authReducer,
});

let initialState = {};
const middleware = [thunk];
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
