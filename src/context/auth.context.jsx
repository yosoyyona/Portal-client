import React, { useState, useEffect } from "react";
import axios from "axios";

<<<<<<< HEAD
const API_URL = "https://vast-jade-woodpecker-sock.cyclic.app";
=======
const API_URL = "https://portal-project.netlify.app/";
>>>>>>> cc3190dc48869d89bc1ffedbeead32ffa8b3ae8d

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  
  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  }  
    
  const authenticateUser = () => { 
    
    const storedToken = localStorage.getItem("authToken");
    
    if (storedToken) {
      axios.get(
        `${API_URL}/auth/verify`, 
        { headers: { Authorization: `Bearer ${storedToken}`} }
      )
      .then((response) => {
        const user = response.data;
      
        setIsLoggedIn(true);
        setIsLoading(false);
        setUser(user);
      })
      .catch((error) => {
        setIsLoggedIn(false);
        setIsLoading(false);
        setUser(null);
      });

    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
    }
  }

  const removeToken = () => {
    localStorage.removeItem("authToken");
  }    
  
  const logOutUser = () => {
    removeToken();
    authenticateUser();
  }    

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ 
        isLoggedIn, isLoading, 
        user, storeToken, 
        authenticateUser, logOutUser }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthProviderWrapper, AuthContext };