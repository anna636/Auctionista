import React from "react";
import { useGlobalContext } from "../contexts/GlobalContext";

function MessageList() {
  const { context } = useGlobalContext();

  return (
    <div>
      {context.messages.length && (
        <div>
          {context.messages.map((msg, i) => (
            <div key={msg + i}>{msg}</div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MessageList;
