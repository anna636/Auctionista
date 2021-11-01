import React from "react";
import { createContext, useContext, useState, useEffect } from "react";

const MessageContext = createContext();

export const useMessage = () => {
  return useContext(MessageContext);
};

const MessageProvider = (props) => {
  const [messages, setMessages] = useState([]);
  const [sendTo, setSendTo]=useState("")

  function updateMessages(newList) {
    setMessages(newList);
  }
  const values = {
    messages,
    setMessages,
    updateMessages,
    sendTo,
    setSendTo,
  };

  return (
    <MessageContext.Provider value={values}>
      {props.children}
    </MessageContext.Provider>
  );
};

export default MessageProvider;
