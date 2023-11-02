// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// initialize an empty api service that we'll inject endpoints into later as needed
const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_APP_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    // const token = getState().auth.token;
    const token = localStorage.getItem("x-app-token"); // token in localstorage will already have Bearer prefix

    // If we have a token set in state, let's assume that we should be passing it.
    if (token) {
      headers.set("authorization", token);
    }

    return headers;
  },
});
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  const invalid = [400, 401];
  if (result.error && result.error.originalStatus === 400) {
    localStorage.removeItem("x-app-token");
    localStorage.removeItem("x-user-id");
    location.reload();
    // // try to get a new token
    // const refreshResult = await baseQuery('/refreshToken', api, extraOptions)
    // if (refreshResult.data) {
    //   // store the new token
    //   api.dispatch(tokenReceived(refreshResult.data))
    //   // retry the initial query
    //   result = await baseQuery(args, api, extraOptions)
    // } else {
    //   api.dispatch(loggedOut())
    // }
  }
  if (result.error && result.error.originalStatus === 401) {
    localStorage.removeItem("x-app-token");
    localStorage.removeItem("x-user-id");
    // location.reload()
    // // try to get a new token
    // const refreshResult = await baseQuery('/refreshToken', api, extraOptions)
    // if (refreshResult.data) {
    //   // store the new token
    //   api.dispatch(tokenReceived(refreshResult.data))
    //   // retry the initial query
    //   result = await baseQuery(args, api, extraOptions)
    // } else {
    //   api.dispatch(loggedOut())
    // }
  }
  return result;
};
const createApiInstance = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Bookmarks", "Recipes", "Suggestions"],
  endpoints: () => ({}),
});

export default createApiInstance;
