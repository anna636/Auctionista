import React, { useEffect, Component, useContext } from "react";
import SockJsClient from "react-stomp";

import { UserContext } from "../../contexts/UserContext";


let clientRef;

export const sendMessage = async (text) => {
  await clientRef.sendMessage(
    "/app/chat/boi2",
    JSON.stringify({
      fromLogin: "anna",
      message: text,
    })
  );
};

function Socket() {
  //const { messages, setMessages, updateMessages } = useMessage();
   const { getCurrentUser, logout } = useContext(UserContext);

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
         /*  var jobs = messages;
          jobs.push(msg);
          setMessages([...jobs]); */
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
