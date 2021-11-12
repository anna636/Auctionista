import React, { useEffect, Component, useContext } from "react";
import SockJsClient from "react-stomp";

import { UserContext } from "../../contexts/UserContext";
import {useMessage} from"../../contexts/MessageContext"


let clientRef;

export const sendMessage = async (sendToUsername, msg) => {

      await clientRef.sendMessage(
    "/app/chat/"+sendToUsername,  //Who recievs msg
    JSON.stringify(msg)
    
  );
  


};

function Socket() {

  const { getCurrentUser, logout } = useContext(UserContext);
  
 const { messages, setMessages, updateMessages, chatsWith, setChatsWith } = useMessage();

  return (
    <>
      {getCurrentUser() !== null ? (
        <SockJsClient
          url="http://localhost:4000/chat"
          topics={[
            "/topic/messages/" + getCurrentUser().username,
            "/topic/notifications",
          ]}
          onConnect={() => {
            console.log("connected");
          }}
          onDisconnect={() => {
            console.log("Disconnected");
          }}
          onMessage={(msg) => {
            setMessages([...messages, msg]);
            if (!chatsWith.includes(msg.fromLogin)) {
              setChatsWith([msg.fromLogin, ...chatsWith]);
            }
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
