import {
  Action,
  combineReducers,
  Reducer,
} from "@reduxjs/toolkit";
import navbarReducer from "./navbarSlice";

const appReducer = combineReducers({
  navbar: navbarReducer,
});

export type AppState = {
  navbar: ReturnType<typeof navbarReducer>;
};

const rootReducer: Reducer = (state: AppState, action: Action) => {
  return appReducer(state, action);
};

export default rootReducer;
