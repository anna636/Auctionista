import React, { createContext, useContext, useState } from "react";
import io from "socket.io-client";

const socket1 = io("http://localhost:9092");
const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

const SocketProvider = (props) => {
  const [socket, setSocket] = useState(socket1);


  const values = {
    socket
  };

  return (
    <SocketContext.Provider value={values}>{props.children}</SocketContext.Provider>
  );
};

export default SocketProvider;
