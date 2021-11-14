import React from "react";
import { createContext, useContext, useState } from "react";

const MessageContext = createContext();

export const useMessage = () => {
  return useContext(MessageContext);
};

const MessageProvider = (props) => {
  const [messages, setMessages] = useState([]);
  const [chatRoom, setChatRoom] = useState("");
  const [chatRooms, setChatRooms] = useState([]);


  const values = {
    messages,
    setMessages,
    
  };

  return (
    <MessageContext.Provider value={values}>
      {props.children}
    </MessageContext.Provider>
  );
};

export default MessageProvider;
