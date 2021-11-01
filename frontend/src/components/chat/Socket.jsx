import React, { useEffect, Component, useContext } from "react";
import SockJsClient from "react-stomp";

import { UserContext } from "../../contexts/UserContext";
import {useMessage} from"../../contexts/MessageContext"


let clientRef;

export const sendMessage = async (text, usernameToSend, fromUsername) => {
  await clientRef.sendMessage(
    "/app/chat/"+usernameToSend,  //Who recievs msg
    JSON.stringify({
      fromLogin: fromUsername, //Who sends msg
      message: text,  //text of msg
    })
  );
};

function Socket() {

  const { getCurrentUser, logout } = useContext(UserContext);
  
 const { messages, setMessages, updateMessages } = useMessage();

  return (
    <>
      {getCurrentUser() !== null ?
        <SockJsClient
        url="http://localhost:4000/chat"
        topics={["/topic/messages/"+getCurrentUser().username]}
        onConnect={() => {
          console.log("connected");
        }}
        onDisconnect={() => {
          console.log("Disconnected");
        }}
        onMessage={(msg) => {
        var jobs = messages;
          jobs.push(msg);
          setMessages([...jobs]);
          console.log(msg);
        }}
        ref={(client) => {
          clientRef = client;
        }}
      />: null}
      
    </>
  );
}

export default Socket;
