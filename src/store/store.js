import { configureStore } from "@reduxjs/toolkit";

import createApiInstance from "../services/createApiInstance";

export const store = configureStore({
  reducer: {
    [createApiInstance.reducerPath]: createApiInstance.reducer,
  },
  devTools: import.meta.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([createApiInstance.middleware]),
});
