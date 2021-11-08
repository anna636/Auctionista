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
import ChatBox from "../components/chat/ChatBox";
import ChatMessage from "../components/chat/ChatMessage";


function MyMessages() {

  const { sendTo, setSendTo, messages, setMessages } = useMessage();
  const [msgToSend, setMsgToSend] = useState("")
  const { getCurrentUser } = useContext(UserContext);
  const [typing, setTyping] = useState(false)
 
  
  function sendNewMsg(e) {
    e.preventDefault()
    let msg = {
      fromLogin: getCurrentUser().username, //Who sends msg
      message: msgToSend, //text of msg
    };
    if (sendTo !== "") {
      sendMessage(sendTo, msg); //First - who will recieve the msg, second - message itself
      setMessages([...messages, msg]);
      setMsgToSend("");
      setTyping(false);
      console.log(messages)
    }
    else {
      console.log("sending to null user")
    }
    

  }

   const pullChildData = (data) => {
     console.log("msg reciever set to ",data);
     setSendTo(data)
   };

  function getInputValue(text) {
    setMsgToSend(text);
    setTyping(true)
  }
  
  return (
    <div className="chatWrapper" style={cosStyles.chatWrapper}>
      <div className="people" style={cosStyles.people}>
        <ChatBox func={pullChildData} sendTo={sendTo }/>
      </div>
      <div style={{ position: "relative", height: "500px" }}>
        <MainContainer>
          <ChatContainer>
            <MessageList>
              {typing ? (
                <TypingIndicator
                  content={getCurrentUser().username + " is typing"}
                />
              ) : null}
              {messages && messages.length > 0
                ? messages.map((msg, i) => (
                    <>
                    <ChatMessage message={msg} sendTo={sendTo }/>
                    </>
                  ))
                : null}
            </MessageList>
          </ChatContainer>
        </MainContainer>
        <div style={cosStyles.inputWrapper} className="chatWrapper">
          <form action="" onSubmit={sendNewMsg} style={cosStyles.form}>
            <input
              type="text"
              style={cosStyles.input}
              onChange={(e) => getInputValue(e.target.value)}
              value={msgToSend}
              onSubmit={sendNewMsg}
            />

            <button style={cosStyles.sendBtn}>Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}
    

          {/* {currentUser && (
        <div>
          {currentUser.chatrooms.length && (
            <div>
              {currentUser.chatrooms.map((room) => (
                <div key={room.id}>
                  <Link to={"/chat/" + room.id }>Room ID: </Link>
                  {room.id}
                </div>
              ))}
            </div>
          )}
        </div>
      )} */}

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
    padding: "2vw 2vw 2vw 2vw",
    overflowY: "scroll",
    
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
    justifyContent: "center",
  },

  input: {
    backgroundColor: "#c6e3fa",
    border: "none",
    borderRadius: "5px",
    height: "100%",
    width: "100%",
    marginLeft: "5vw",
  },

  sendBtn: {
    width: "50%",
    marginLeft: "13vh",
    border: "none",
    color: "black",
    backgroundColor: "#c6e3fa",
    borderRadius: "10px",
    fontFamily: `"Trebuchet MS", Helvetica, sans-serif`,
  },
  form: {
    display: "grid",
    gridTemplateColumns: "70% 30%",

    flexDirection: "row",
  },
};