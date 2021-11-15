import React from "react";
import { createContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [currentUserId, setCurrentUserId]=useState("")


  const register = async (user) => {
    let res = await fetch("/api/signup", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(user),
    });
    return res;
  };

  const login = async (user) => {
    let res = await fetch("/api/newlogin", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(user),
    });
    res = await res.json();
    console.log("this is login", res);
    if (res.accessToken) {
     
      localStorage.setItem("accessToken", res.accessToken);
      await whoAmI();
      return res;
    } else {
    
      return null;
    }
  };

  const whoAmI = async () => {
    console.log("local storage is", localStorage.getItem("accessToken"));
    try {
      let res = await fetch("/api/user/me", {
        method: "GET",
        headers: new Headers({
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        }),
      });
      res = await res.json();

      if (res.status == 500) {
        console.log("Current user not found", res);
        setCurrentUser(null);
        return null;
      } else {
        console.log("found current user", res);
       
        setCurrentUser({ ...res });
        console.log("current user id whoami", currentUser)
        setCurrentUserId(res.id.toString())
       

        return res
      }
    } catch {
      console.log("Current user not found")
    }
  };

  const getCurrentUser = () => {
    return currentUser;
  };

  const logout = async () => {
    localStorage.removeItem("accessToken");
    let res=await fetch("/logout")
    setCurrentUser(null);

    console.log("You have been logged out");

  };

  useEffect(async () => {
    await whoAmI();
  }, []);

  const values = {
    register,
    login,
    logout,
    getCurrentUser,
    whoAmI,
    currentUser,
    users,
    currentUserId
  };

  return (
    <UserContext.Provider value={values}>{props.children}</UserContext.Provider>
  );
};

export default UserContextProvider;
