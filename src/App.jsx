import { useRoutes } from "react-router-dom";

import useAuth from "./hooks/useAuth";
import { withErrorHandler } from "./error-handling";
import AppErrorBoundaryFallback from "./error-handling/App";
import authenticatedRoutes from "./routes/authenticatedRoutes";
import publicRoutes from "./routes/publicRoutes";

function App() {
  // auth check logic
  const { auth } = useAuth();

  const routesData = useRoutes(
    auth?.token // when user logs in
      ? authenticatedRoutes
      : publicRoutes // when not logged in
  );

  return <>{routesData}</>;
}

export default withErrorHandler(App, AppErrorBoundaryFallback);
