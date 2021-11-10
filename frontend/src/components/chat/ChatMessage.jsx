import React, { useContext } from "react";
import { Message } from "@chatscope/chat-ui-kit-react";
import { UserContext } from "../../contexts/UserContext";
import { useMessage } from "../../contexts/MessageContext";

function ChatMessage(props) {
  const { currentUser } = useContext(UserContext);
    const { chatRoom } = useMessage();

  return (
    <>
      {currentUser && (
        <Message
          model={{
            message: props.message.message,
            direction:
              props.message.userId == currentUser.id ? "outgoing" : "incoming",
            position: "single",
          }}
        >
          <Message.Header sender={props.otherUser} />
        </Message>
      )}
    </>
  );
}

export default ChatMessage;
