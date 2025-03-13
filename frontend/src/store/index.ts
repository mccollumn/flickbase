import { configureStore } from "@reduxjs/toolkit";
import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
} from "react-redux";
import usersReducer from "./reducers/users";
import articlesReducer from "./reducers/articles";
import siteReducer from "./reducers/site";
import notificationsReducer from "./reducers/notifications";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    articles: articlesReducer,
    site: siteReducer,
    notifications: notificationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch = () => useReduxDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
