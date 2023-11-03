import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  email: "", // Add email property
  isLoggedIn: false,
  login: (token, email) => {}, // Modify login function to accept email
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const initialEmail = localStorage.getItem("email"); // Get the email from localStorage
  const [token, setToken] = useState(initialToken);
  const [email, setEmail] = useState(initialEmail); // Initialize email state

  const userIsLoggedIn = !!token;

  const loginHandler = (token, email) => {
    setToken(token);
    localStorage.setItem("token", token);
    setEmail(email); // Set the email in the context and localStorage
    localStorage.setItem("email", email);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    setEmail(""); // Clear the email when logging out
    localStorage.removeItem("email");
  };

  const contextValue = {
    token: token,
    email: email, // Include email in the context value
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
