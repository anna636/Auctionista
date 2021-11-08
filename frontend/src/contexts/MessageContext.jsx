import React from "react";
import { createContext, useContext, useState } from "react";

const MessageContext = createContext();

export const useMessage = () => {
  return useContext(MessageContext);
};

const MessageProvider = (props) => {
  const [messages, setMessages] = useState([]);
  const [sendTo, setSendTo] = useState("")
  const [chatsWith, setChatsWith]=useState([])

  function updateMessages(newList) {
    setMessages(newList);
  }
  const values = {
    messages,
    setMessages,
    updateMessages,
    sendTo,
    setSendTo,
    chatsWith,
    setChatsWith
  };

  return (
    <MessageContext.Provider value={values}>
      {props.children}
    </MessageContext.Provider>
  );
};

export default MessageProvider;
