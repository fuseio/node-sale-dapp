import {
  Action,
  combineReducers,
  Reducer,
} from "@reduxjs/toolkit";
import navbarReducer from "./navbarSlice";
import userReducer from "./userSlice";

const appReducer = combineReducers({
  navbar: navbarReducer,
  user: userReducer,
});

export type AppState = {
  navbar: ReturnType<typeof navbarReducer>;
  user: ReturnType<typeof userReducer>;
};

const rootReducer: Reducer = (state: AppState, action: Action) => {
  return appReducer(state, action);
};

export default rootReducer;
