import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";
// import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import productReducer from "./reducers/productReducer";

const rootReducer = combineReducers({
  products: productReducer,
});

let initialState = {};
const middleware = [thunk];
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
