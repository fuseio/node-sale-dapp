import {
  Action,
  combineReducers,
  Reducer,
} from "@reduxjs/toolkit";
import balanceReducer from "./balanceSlice";
import navbarReducer from "./navbarSlice";

const appReducer = combineReducers({
  balance: balanceReducer,
  navbar: navbarReducer,
});

export type AppState = {
  balance: ReturnType<typeof balanceReducer>;
  navbar: ReturnType<typeof navbarReducer>;
};

const rootReducer: Reducer = (state: AppState, action: Action) => {
  return appReducer(state, action);
};

export default rootReducer;
