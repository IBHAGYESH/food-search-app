import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

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

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
