import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(undefined);

  async function getLoggedIn() {
    const loggedInRes = await axios.get("http://localhost:5000/loggedIn");
    const setUser = await axios.get('http://localhost:5000/setuser');
    if(setUser.data === false){
      localStorage.clear();
    } else {
      console.log(setUser.data);
      localStorage.setItem('user', JSON.stringify(setUser));
    }
    
    setUserInfo(setUser.data);
    setLoggedIn(loggedInRes.data);
  }

  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, userInfo, getLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };


