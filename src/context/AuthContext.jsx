import React, { createContext, useState, useContext, useEffect } from "react";
import appStates from "../Objects/AppStates";
import api from "../Objects/api";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

/**
 * Provides authentication context for the application, managing the token and application state 
 * (Login, Logout, Create). It includes methods for login, logout, token validation, and 
 * state management, ensuring the app behaves based on the user's authentication status.
 * 
 * @param {Object} param0 - The properties passed to the component.
 * @param {JSX.Element} param0.children - The child components to render within the AuthProvider.
 * 
 * @returns {JSX.Element} The context provider wrapping the application with authentication state.
 */
const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => sessionStorage.getItem("token"));
  const [appState, setAppState] = useState(() => {
    const storedState = sessionStorage.getItem("appState");
    return storedState ? storedState : appStates.Login;
  });

  /**
   * Logs the user in by sending a POST request with login credentials.
   * If successful, stores the token and updates the app state to "Logout".
   * 
   * @param {string} login - The username for login.
   * @param {string} password - The password for login.
   */
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
      sessionStorage.setItem("token", data.token);

      setAppState(appStates.Logout);
      sessionStorage.setItem("appState", appStates.Logout);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Decodes the JWT token to retrieve the payload data.
   * 
   * @param {string} token - The JWT token to decode.
   * @returns {Object|null} The decoded token data or null if invalid.
   */
  const getTokenData = (token) => {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error("Invalid Token", error);
      return null;
    }
  };

  /**
   * Logs the user out by clearing the token and resetting the app state to "Login".
   */
  const logout = () => {
    setToken(null);
    sessionStorage.removeItem("token");
    setAppState(appStates.Login);
    sessionStorage.setItem("appState", appStates.Login);
  };

  /**
   * Changes the app state to "Create" for user creation and updates local storage.
   */
  const createUser = () => {
    setAppState(appStates.Create);
    sessionStorage.setItem("appState", appStates.Create);
  };

  /**
   * Resets the app state to "Login" for navigating back to the login screen.
   */
  const goToLogin = () => {
    setAppState(appStates.Login);
    sessionStorage.setItem("appState", appStates.Login);
  };

  /**
   * Validates the stored token's expiration status and logs out the user if expired.
   * Runs initially and every minute thereafter to ensure the token is still valid.
   */
  useEffect(() => {
    const checkTokenValidity = () => {
      const storedToken = sessionStorage.getItem("token");
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
