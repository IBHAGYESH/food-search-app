export const ApiRoutes = {
  signUp: {
    url: "/auth/signup",
    method: "POST",
  },
  login: {
    url: "/auth/login",
    method: "POST",
  },
  logout: {
    url: "/auth/logout",
    method: "POST",
  },
  getRandomRecipes: {
    url: "/recipes/random",
    method: "GET",
  },
  getRecipeNames: {
    url: "/recipes/autocomplete",
    method: "GET",
  },
  searchRecipes: {
    url: "/recipes/search",
    method: "GET",
  },
  getRecipeInformation: {
    url: "/recipes/information/:recipe_id",
    method: "GET",
  },
  addBookmark: {
    url: "/bookmarks",
    method: "POST",
  },
  getBookmarks: {
    url: "/bookmarks/:user_id",
    method: "GET",
  },
  removeBookmark: {
    url: "/bookmarks",
    method: "DELETE",
  },
};
