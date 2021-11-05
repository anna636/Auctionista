import React from "react";
import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

const GlobalProvider = (props) => {
  const [context, setContext] = useState({
    chatroom: {},
    userId: "",
    messages: [],
  });


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
      console.log("From getRoomById: ", fetchedItem);
      return fetchedItem;
    } catch {
      console.log("No item found");
    }
  };

  // helper function to only update
  // specific values in the context
  function updateContext(values) {
    setContext({
      ...context,
      ...values,
    });
  }

  const values = {
    context,
    updateContext,
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
