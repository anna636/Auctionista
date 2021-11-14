import React, { useEffect, Component, useContext } from "react";
import SockJsClient from "react-stomp";

import { UserContext } from "../../contexts/UserContext";
import {useMessage} from"../../contexts/MessageContext"


let clientRef;

export const sendMessage = async (sendToEmail, msg) => {

      await clientRef.sendMessage(
    "/app/chat/"+sendToEmail,  //Who recievs msg
    JSON.stringify(msg)
    
  );

};

export const sendNotification = async (itemIdToUdate, msg) => {
  await clientRef.sendMessage("/app/chat/update", JSON.stringify(msg))
}

function Socket() {

  const { getCurrentUser, logout } = useContext(UserContext);
  
 const { messages, setMessages} = useMessage();

  return (
    <>
      {getCurrentUser() !== null ? (
        <SockJsClient
          url="http://localhost:4000/chat"
          topics={[
            "/topic/messages/" + getCurrentUser().email,
            "/topic/notifs/update",
          ]}
          onConnect={() => {
            console.log("connected");
          }}
          onDisconnect={() => {
            console.log("Disconnected");
          }}
          onMessage={(msg) => {
            setMessages([...messages, msg]);

            console.log(msg);
          }}
          ref={(client) => {
            clientRef = client;
          }}
        />
      ) : null}
    </>
  );
}

export default Socket;
