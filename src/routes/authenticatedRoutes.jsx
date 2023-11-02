import React from "react";

import lazyLoadComponent from "../components/lazyLoadComponent";

const AuthenticatedLayout = React.lazy(() =>
  import("../layouts/AuthenticatedLayout")
);

const NotFound = React.lazy(() => import("../pages/NotFound"));
const Search = React.lazy(() => import("../pages/Search"));
const Recipe = React.lazy(() => import("../pages/Recipe"));
const Bookmarks = React.lazy(() => import("../pages/Bookmarks"));

const authenticatedRoutes = [
  {
    path: "/",
    element: lazyLoadComponent(<AuthenticatedLayout />),
    children: [
      {
        index: true,
        element: lazyLoadComponent(<Search />),
      },
      {
        path: "recipe/:recipe_id",
        element: lazyLoadComponent(<Recipe />),
      },
      {
        path: "bookmarks",
        element: lazyLoadComponent(<Bookmarks />),
      },
      {
        path: "*",
        element: lazyLoadComponent(<Search />),
      },
    ],
  },
  {
    path: "*",
    element: lazyLoadComponent(<NotFound />),
  },
];

export default authenticatedRoutes;
