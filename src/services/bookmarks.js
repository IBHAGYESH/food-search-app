import { ApiRoutes } from "./apiRoutes";
import createApiInstance from "./createApiInstance";

export const extendedApi = createApiInstance.injectEndpoints({
  endpoints: (builder) => ({
    getBookmarks: builder.query({
      query: (user_id) => {
        return {
          url: ApiRoutes.getBookmarks.url.replace(":user_id", user_id),
          method: ApiRoutes.getBookmarks.method,
          credentials: "same-origin",
        };
      },
      providesTags: ["Bookmarks"],
      transformResponse: (response) => response,
    }),
    addBookmark: builder.mutation({
      query(body) {
        return {
          url: ApiRoutes.addBookmark.url,
          method: ApiRoutes.addBookmark.method,
          body,
          credentials: "same-origin",
        };
      },
      invalidatesTags: ["Bookmarks"],
      transformResponse: (res) => {
        return res;
      },
    }),
    removeBookmark: builder.mutation({
      query(query) {
        return {
          url: ApiRoutes.removeBookmark.url,
          method: ApiRoutes.removeBookmark.method,
          params: query,
          credentials: "same-origin",
        };
      },
      invalidatesTags: ["Bookmarks"],
      transformResponse: (res) => {
        return res;
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetBookmarksQuery,
  useLazyGetBookmarksQuery,
  useAddBookmarkMutation,
  useRemoveBookmarkMutation,
} = extendedApi;
