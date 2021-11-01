import React, {useState, useEffect, useContext} from "react";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import { useMessage } from "../contexts/MessageContext";
import { sendMessage } from "../components/chat/Socket";
import { UserContext } from "../contexts/UserContext";


function MyMessages() {

  const { sendTo, setSendTo, messages, setMessages } = useMessage();
  const [msgToSend, setMsgToSend] = useState("")
  const { getCurrentUser } = useContext(UserContext);
  const [typing, setTyping]=useState(false)
  
  function sendNewMsg() {
    let msg = {
      fromLogin: getCurrentUser().username, //Who sends msg
      message: msgToSend, //text of msg
    };
    sendMessage(sendTo, msg); //First - who will recieve the msg, second - message itself
    setMessages([...messages, msg])
    setMsgToSend("")
    setTyping(false)

  }

  function getInputValue(text) {
    setMsgToSend(text);
    setTyping(true)
  }
  
  return (
    <div className="chatWrapper" style={cosStyles.chatWrapper}>
      <div className="people" style={cosStyles.people}></div>
      <div style={{ position: "relative", height: "500px" }}>
        <MainContainer>
          <ChatContainer>
            <MessageList>
              {typing ? 
                <TypingIndicator content={getCurrentUser().username + " is typing" } /> : null}
              {messages && messages.length > 0
                ? messages.map((msg, i) => (
                    <>
                      <Message
                        model={{
                          message: msg.message,
                          direction:
                            msg.fromLogin === getCurrentUser().username
                              ? "outgoing"
                              : "incoming",
                          sender: msg.fromLogin,
                          position: "single",
                        }}
                      />
                      <Message.Header sender={msg.fromLogin} />
                    </>
                  ))
                : null}
            </MessageList>
          </ChatContainer>
        </MainContainer>
        <div style={cosStyles.inputWrapper} className="chatWrapper">
          <input
            type="text"
            style={cosStyles.input}
            onChange={(e) => getInputValue(e.target.value)}
            value={msgToSend}
          />
          <button style={styles.sendBtn} onClick={sendNewMsg}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyMessages;


const cosStyles = {
  chatWrapper: {
    display: "grid",
    gridTemplateColumns: "30% 70%",
    padding: "5vh 3vw 5vh 1vw",
    gap: "1vw",
    height: "100vh",
  },
  people: {
    width: "100%",
    backgroundColor: "#c6e3fa",
    borderRadius: "10px",
    height: "87%",
  },
  inputWrapper: {
    width: "100%",
    height: "10vh",
    borderRadius: "10px",
    border: "1px solid lightGrey",
    marginTop: "3vh",
    display: "grid",
    gridTemplateColumns: "90% 10%",
    alignItems: "center",
    justifyContent:"center"
  },

  input: {
    backgroundColor: "#c6e3fa",
    border: "none",
    borderRadius: "10px",
    height: "70%",
    width:"60%"
  },

  sendBtn: {
    width:"50%"
  }
};