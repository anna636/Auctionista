import React, {useState, useContext, useEffect} from 'react'
import {

  Message,

} from "@chatscope/chat-ui-kit-react";
import { UserContext } from "../../contexts/UserContext";

function ChatMessage(props) {


  useEffect(() => {
    console.log(props.sendTo)
  }, [])
  const { getCurrentUser } = useContext(UserContext);
  
  
  return (
    <>
   
      <Message
      model={{
        message: props.message.message,
        direction:
          props.message.fromLogin === getCurrentUser().username ? "outgoing" : "incoming",
        sender: props.message.fromLogin,
        position: "single",
        }}
        
      />
    
      </>
  );
}

export default ChatMessage
