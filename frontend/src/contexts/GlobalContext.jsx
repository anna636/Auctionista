import React from "react";
import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

const GlobalProvider = (props) => {
  const [context, setContext] = useState({
    user: null,
    messages: [],
  });


    const createNewRoom = async (roomInfo) => {
      try {
        let response = await fetch("/rest/chatroom", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(roomInfo),
        });
        console.log(await response.json());
        return response;
      } catch {
        console.log("Creating new room failed");
        return null;
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
    createNewRoom
  };

  return (
    <GlobalContext.Provider value={values}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
