import React from "react";

import lazyLoadComponent from "../components/lazyLoadComponent";

const PublicLayout = React.lazy(() => import("../layouts/PublicLayout"));

const Login = React.lazy(() => import("../pages/Login"));
const SignUp = React.lazy(() => import("../pages/SignUp"));
const NotFound = React.lazy(() => import("../pages/NotFound"));

const publicRoutes = [
  {
    path: "/",
    element: lazyLoadComponent(<PublicLayout />),
    children: [
      {
        index: true,
        element: lazyLoadComponent(<Login />),
      },
      {
        path: "log-in",
        element: lazyLoadComponent(<Login />),
      },
      {
        path: "sign-up",
        element: lazyLoadComponent(<SignUp />),
      },
      {
        path: "*",
        element: lazyLoadComponent(<Login />),
      },
    ],
  },
  {
    path: "*",
    element: lazyLoadComponent(<NotFound />),
  },
];

export default publicRoutes;
