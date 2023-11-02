import { ApiRoutes } from "./apiRoutes";
import createApiInstance from "./createApiInstance";

const authApi = createApiInstance.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query(body) {
        return {
          url: ApiRoutes.login.url,
          method: ApiRoutes.login.method,
          body,
        };
      },
      transformResponse: (res, meta, arg) => {
        return res;
      },
    }),
    logout: builder.mutation({
      query() {
        return {
          url: ApiRoutes.logout.url,
          method: ApiRoutes.logout.method,
        };
      },
      transformResponse: (res) => {
        return res;
      },
    }),
    signUp: builder.mutation({
      query(body) {
        return {
          url: ApiRoutes.signUp.url,
          method: ApiRoutes.signUp.method,
          body,
        };
      },
      transformResponse: (res) => {
        return res;
      },
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useLogoutMutation, useSignUpMutation } =
  authApi;
