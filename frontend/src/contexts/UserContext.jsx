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
    let res = await fetch("/api/register", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(user),
    });
    if (res.status == 400) {
      return "false"
    }
    else {
      res = await res.json();
    setCurrentUser(res);
    console.log(res, " This is register ")
    return res;
    }
    
  };

  const login = async (user) => {
    let res = await fetch("/api/newlogin", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(user),
    });
    res = await res.json();
    if (res.status !==403) {
      setCurrentUser(res);
    }
    console.log(res, " This is login ")
    return res;
  };

  const whoAmI = async () => {
    let res = await fetch("/api/whoami");
    res = await res.json();
    if (!res.error) {
      setCurrentUser({ ...res });
    } else { setCurrentUser(null); }
    console.log(res, " This is whoami ")
  };

  const getCurrentUser = () => {
    return currentUser
  }

  
  const logout = async () => {
    let res = await fetch("/api/logout", {
      method: "DELETE",
    });
    res = await res.json();
    setCurrentUser(null)
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
