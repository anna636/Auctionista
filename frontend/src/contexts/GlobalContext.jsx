import React from "react";
import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

const GlobalProvider = (props) => {
  const[connectedToRoom, setConnectedToRoom] = useState(false)
  const [context, setContext] = useState({
    user: null,
    messages: [],
  });

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
    connectedToRoom,
    setConnectedToRoom,
  };

  return (
    <GlobalContext.Provider value={values}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
