import React, { createContext, useContext, useState, useEffect } from "react";
import { useMessage } from "../contexts/MessageContext";
import io from "socket.io-client";

const socket1 = io("http://localhost:9092");
const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

const SocketProvider = (props) => {
  const [socket, setSocket] = useState(socket1);
  const [isConnected, setIsConnected] = useState(false);
  const { messages, setMessages, setChatRoom, getRoomById } = useMessage();

  useEffect(() => {
    connect();
  }, []);

  function connect() {
    setEventListeners();
  }

  function setEventListeners() {
    socket.on("connect", () => {
      // setConnected(true);
      console.log("socket connected");
    });

    socket.on("chat", function (data) {
      console.log("Received message", data);
      let tempObject = {
        userId: data.userId,
        message: data.message,
        chatRoom: data.chatRoom,
      };
      setMessages([...messages, tempObject]);
    });

    socket.on("join", async function (roomId) {
      setIsConnected(true)
      let room = await getRoomById(roomId)
      setChatRoom(room)
      console.log("In SocketCntx, room set to: ", room);
    });

    socket.on("leave", function (message) {
      setIsConnected(false)
      console.log(message);
    });

    socket.on("disconnect", function () {
      // setConnected(false);
      console.log("socket disconnected");
    });

    socket.on("reconnect_attempt", (attempts) => {
      console.log("Try to reconnect at " + attempts + " attempt(s).");
    });
  }

  const values = {
    socket,
    isConnected,
    setIsConnected
  };

  return (
    <SocketContext.Provider value={values}>
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
