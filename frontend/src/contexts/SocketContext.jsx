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
  const { setChatRoom, getRoomById } = useMessage();

  useEffect(() => {
    connect();
  }, []);

  function connect() {
    setEventListeners();
  }

  function setEventListeners() {
    socket.on("connect", () => {
      console.log("socket connected");
    });

    socket.on("join", async function (roomId) {
      let room = await getRoomById(roomId)
      setChatRoom(room)
      console.log("Joined room: ", roomId);
    });

    socket.on("leave", function (roomId) {
      console.log("Left room: ", roomId);
    });

    socket.on("disconnect", function () {
      console.log("socket disconnected");
    });

    socket.on("reconnect_attempt", (attempts) => {
      console.log("Try to reconnect at " + attempts + " attempt(s).");
    });
  }

  const values = {
    socket,
  };

  return (
    <SocketContext.Provider value={values}>
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
