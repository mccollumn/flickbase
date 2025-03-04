import { configureStore } from "@reduxjs/toolkit";
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
