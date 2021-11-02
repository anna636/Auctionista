import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { useAuctionItem } from "../contexts/AuctionItemContext";

const MessageContext = createContext();

export const useMessageContext = () => {
  return useContext(MessageContext);
};

const MessageProvider = (props) => {
  const[messages, setMessages] = useState([])

  const values = {

  };

  return (
    <MessageContext.Provider value={values}>{props.children}</MessageContext.Provider>
  );
};

export default MessageProvider;
