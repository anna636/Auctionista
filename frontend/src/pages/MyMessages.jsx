import React from "react";
import { useGlobalContext } from "../contexts/GlobalContext";


function MyMessages() {
  const { context } = useGlobalContext();


  
  return (
    <div>
      <h4>My messages</h4>
    </div>
  );
}

export default MyMessages;
