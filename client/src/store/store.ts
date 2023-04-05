import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./reducers/appReducer";
import socketReducer from "./reducers/socketReducer";

const store = configureStore({
  reducer: {
    app: appReducer,
    socket: socketReducer,
  },
});

export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
