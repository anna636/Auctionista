import React from "react";

function MessageList(props) {

  return (
    <div>
      {props.messageList.length && (
        <div>
          {props.messageList.map((msg, i) => (
            <div key={msg + i}>{msg}</div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MessageList;
