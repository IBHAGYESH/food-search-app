import { ApiRoutes } from "./apiRoutes";
import createApiInstance from "./createApiInstance";

export const recipeApi = createApiInstance.injectEndpoints({
  endpoints: (builder) => ({
    getRandomRecipe: builder.query({
      query: () => {
        return {
          url: ApiRoutes.getRandomRecipes.url,
          method: ApiRoutes.getRandomRecipes.method,
          credentials: "same-origin",
        };
      },
      providesTags: ["Recipes"],
      transformResponse: (response) => response,
    }),
    getRecipeNames: builder.query({
      query: (params) => {
        return {
          url: ApiRoutes.getRecipeNames.url,
          method: ApiRoutes.getRecipeNames.method,
          credentials: "same-origin",
          params,
        };
      },
      providesTags: ["Suggestions"],
      invalidatesTags: ["Suggestions"],
      transformResponse: (response) => response,
    }),
    searchRecipes: builder.query({
      query: (params) => {
        return {
          url: ApiRoutes.searchRecipes.url,
          method: ApiRoutes.searchRecipes.method,
          credentials: "same-origin",
          params,
        };
      },
      providesTags: ["Recipes"],
      invalidatesTags: ["Recipes"],
      transformResponse: (response) => response,
    }),
    getRecipeInformation: builder.query({
      query: (recipe_id) => {
        return {
          url: ApiRoutes.getRecipeInformation.url.replace(
            ":recipe_id",
            recipe_id
          ),
          method: ApiRoutes.getRecipeInformation.method,
          credentials: "same-origin",
        };
      },
      transformResponse: (res) => {
        return res;
      },
    }),
  }),
});

export const {
  useLazySearchRecipesQuery,
  useGetRandomRecipeQuery,
  useGetRecipeNamesQuery,
  useSearchRecipesQuery,
  useGetRecipeInformationQuery,
} = recipeApi;
