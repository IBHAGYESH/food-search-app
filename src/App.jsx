import { useRoutes } from "react-router-dom";

import useAuth from "./hooks/useAuth";
import { withErrorHandler } from "./error-handling";
import AppErrorBoundaryFallback from "./error-handling/App";
import authenticatedRoutes from "./routes/authenticatedRoutes";
import publicRoutes from "./routes/publicRoutes";

function App() {
  // auth check logic
  const { auth } = useAuth();

  // the auth logic when page refresh
  // for cookies
  // useEffect(() => {
  //   if (Cookies.get("x-app-token") && !auth) {
  //     // extract user data from token in cookie and set the auth context
  //     const decoded = jwtDecode(Cookies.get("x-app-token"));
  //     setAuth({ id: decoded.user_id });
  //   }
  // }, [auth]);

  // for token
  useEffect(() => {
    if (
      localStorage.getItem("x-app-token") &&
      localStorage.getItem("x-app-user-id") &&
      localStorage.getItem("x-app-user-name") &&
      !auth.token
    ) {
      // extract user data from token in cookie and set the auth context
      setAuth({
        id: localStorage.getItem("x-app-user-id"),
        name: localStorage.getItem("x-app-user-name"),
        token: localStorage.getItem("x-app-token"),
      });
    }
  }, [auth]);

  const routesData = useRoutes(
    auth?.token // when user logs in
      ? authenticatedRoutes
      : publicRoutes // when not logged in
  );

  return <>{routesData}</>;
}

export default withErrorHandler(App, AppErrorBoundaryFallback);
