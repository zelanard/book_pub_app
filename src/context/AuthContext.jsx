import React, { createContext, useState, useContext, useEffect } from "react";
import appStates from "../Objects/AppStates";
import api from "../Objects/api";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [appState, setAppState] = useState(() => {
    const storedState = localStorage.getItem("appState");
    return storedState ? storedState : appStates.Login;
  });

  const login = async (login, password) => {
    try {
      const response = await fetch(api.login, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
      });

      if (!response.ok) throw new Error("Login failed");

      const data = await response.json();
      setToken(data.token);
      localStorage.setItem("token", data.token);

      setAppState(appStates.Logout);
      localStorage.setItem("appState", appStates.Logout);
    } catch (error) {
      console.error(error);
    }
  };

  const getTokenData = (token) => {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error("Invalid Token", error);
      return null;
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    setAppState(appStates.Login);
    localStorage.setItem("appState", appStates.Login);
  };

  const createUser = () => {
    setAppState(appStates.Create);
    localStorage.setItem("appState", appStates.Create);
  };

  const goToLogin = () => {
    setAppState(appStates.Login);
    localStorage.setItem("appState", appStates.Login);
  };

  // Check token expiration every minute
  useEffect(() => {
    const checkTokenValidity = () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        const decoded = getTokenData(storedToken);
        console.warn("You are still logged in!");
        if (decoded?.exp && decoded.exp * 1000 < Date.now()) {
          console.warn("Token expired. Logging out...");
          logout();
        }
      }
    };

    checkTokenValidity(); // Run initially

    const interval = setInterval(checkTokenValidity, 60000); // Run every 1 minute

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <AuthContext.Provider value={{ token, appState, login, logout, createUser, goToLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
