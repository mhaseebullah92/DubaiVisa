// import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // State to hold the authentication token
  const [token, setToken_] = useState(localStorage.getItem("token"));
  const [expTim, setExpTim_] = useState(localStorage.getItem("expstamp"));

  // Function to set the authentication token
  const setToken = (newToken) => {
    
    setToken_(newToken.token);
    setExpTim_(newToken.expiration)
    
  };

  useEffect(() => {
    if (token) {
    //   axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    
      localStorage.setItem('token',token);
    } else {
    
    //   delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem('token')
    }
  }, [token]);
  useEffect(() => {
    if (token && expTim) {
    //   axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    
      localStorage.setItem('expstamp',expTim);
    } else {
    
    //   delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem('expstamp')
    }
  }, [expTim,token]);

  useEffect(()=>{
    
    const currentTime = new Date().getTime();
    const expirationTime = new Date(localStorage.getItem("expstamp")).getTime();
  
    const timeDifference = expirationTime - currentTime;
  
    if (timeDifference <= 0) {
      localStorage.removeItem('token');
      localStorage.removeItem('expstamp');
      setToken_('');
      setExpTim_('');
    }
  },[])

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token]
  );
  

  // Provide the authentication context to the children components
  return (
    <>
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    </>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;