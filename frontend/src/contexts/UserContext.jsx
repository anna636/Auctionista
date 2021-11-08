import React from "react";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();



const UserContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  


  const fetchUsers = async () => {
    let res = await fetch("/rest/users");
    res = await res.json();
    setUsers(res);

  };

  useEffect(() => {
    fetchUsers();
  }, []);


  const register = async (user) => {
    let res = await fetch("/api/signup", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(user),
    });
    return res
    
  };

  const login = async (user) => {
    let res = await fetch("/api/newlogin", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(user),
    });
    res = await res.json();
    console.log("this is login", res)
   if (res.accessToken) {
     localStorage.setItem("accessToken", res.accessToken);
     await whoAmI()
      return res;
    }
   else {
     return null
    }
    
  };

  const whoAmI = async () => {
    console.log("local storage is", localStorage.getItem("accessToken"));
    let res = await fetch("/api/user/me", {
      method: "GET",
      headers: new Headers({
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      }),
    });
    res = await res.json();
    
    if (res.status==500) {
      //setCurrentUser({ ...res });
      console.log("Current user not found", res)
      setCurrentUser(null)
    }
    else {
      console.log("found current user", res)
      setCurrentUser({...res})
    }
   
  };

  const getCurrentUser = () => {
    return currentUser
  }

  
  const logout = async () => {
    localStorage.removeItem("accessToken");
    setCurrentUser(null)
    console.log("You have been logged out")
  };

  useEffect(() => {
    whoAmI();
  }, []);

  const values = {
    register,
    login,
    logout,
    getCurrentUser,
    whoAmI,
    currentUser,
    users,
  };
  

 
  return (
    <UserContext.Provider value={values}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
