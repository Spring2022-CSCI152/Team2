import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(false);

  async function getLoggedIn() {
    const loggedInRes = await axios.get("http://localhost:5000/loggedIn");
    console.log(loggedInRes.data.loggedIn);
    setLoggedIn(loggedInRes.data.loggedIn);
  }

  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };


