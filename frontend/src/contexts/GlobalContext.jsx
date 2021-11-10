import React from "react";
import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

const GlobalProvider = (props) => {
  const [context, setContext] = useState([]);


    const createNewRoom = async (roomInfo) => {
      try {
        let response = await fetch("/rest/chatroom", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(roomInfo),
        });
        return response.json();
      } catch {
        console.log("Creating new room failed");
        return null;
      }
    };

  
  const getRoomById = async (id) => {
    let res = await fetch("/rest/chatroom/" + id);
    try {
      let fetchedItem = await res.json();
      return fetchedItem;
    } catch {
      console.log("No item found");
    }
  };

  const values = {
    context,
    setContext,
    createNewRoom,
    getRoomById
  };

  return (
    <GlobalContext.Provider value={values}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
