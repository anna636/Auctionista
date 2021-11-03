import React, { useEffect } from "react";
import io from "socket.io-client"
import { useGlobalContext } from "./contexts/GlobalContext";

// the socket connection
let socket;

// function to send data with websocket
export function emit(event, data) {
  socket.emit(event, data);
}

// WebSocket connection is a component
// to enable using the Context
function Socket() {
  const { context, updateContext } = useGlobalContext();

  useEffect(() => {
    connect();
  }, []);

  function connect() {
    // connect websocket to server
    socket = io("http://localhost:9092");
    setEventListeners();
  }


  // update event listeners when context changes
  // to always have up to date data in the callbacks
  useEffect(() => {
    setEventListeners();
  }, [context]);

  function setEventListeners() {
    socket.on("connect", () => {
      console.log("socket connected");
    });

    socket.on("chat", function (data) {
      console.log("Received message", data);
      updateContext({
        user: data.user,
        messages: [...context.messages, data.message],
      })
    });

    socket.on("join", function (message) {
      console.log(message);
    });

    socket.on("leave", function (message) {
      console.log(message);
    });

    socket.on("disconnect", function () {
      console.log("socket disconnected");
    });

    socket.on("reconnect_attempt", (attempts) => {
      console.log("Try to reconnect at " + attempts + " attempt(s).");
    });
  }

  return <></>;
}

export default Socket;
