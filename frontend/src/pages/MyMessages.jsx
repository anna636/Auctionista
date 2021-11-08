import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import { useMessage } from "../contexts/MessageContext";
import { UserContext } from "../contexts/UserContext";
import ChatBox from "../components/chat/ChatBox";
import ChatMessage from "../components/chat/ChatMessage";
import { useSocketContext } from "../contexts/SocketContext";

function MyMessages() {
  const history = useHistory();
  const { chatRoom, setChatRoom, messages, setMessages } = useMessage();
  const [msgToSend, setMsgToSend] = useState("");
  const { getCurrentUser, currentUser } = useContext(UserContext);
  const [typing, setTyping] = useState(false);
  const [otherUserName, setOtherUserName] = useState("");
  const { socket } = useSocketContext();
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    getCurrentUser();
  }, [chatRoom]);

  useEffect(() => {
    connect();
  }, [messages]);

  function connect() {
    setEventListeners();
  }

  function setEventListeners() {
    socket.on("connect", () => {
      setConnected(true);
      console.log("socket connected");
    });

    socket.on("chat", function (data) {
      console.log("Received message", data);
      let tempObject = { userId: data.userId, message: data.message };
      setMessages([...messages, tempObject]);
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

  function handleSubmit(e) {
    e.preventDefault();

    let data = {
      chatroom: chatRoom,
      userId: currentUser.id + "",
      message: msgToSend,
    };
    postMessage(data);

    console.log("Messages: ", messages);

    setMsgToSend("");
    setTyping(false);
  }

  async function postMessage(data) {
    await fetch("/api/message/" + chatRoom.id, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
  }

  const pullChildData = (room) => {
    console.log("Room recver set to ", room);

    socket.emit("join", "" + room.id);
    setChatRoom(room);
    history.push("/chat/" + room.id);

    setOtherUserName(getOtherUserName(room));
  };

  function getOtherUserName(room) {
    let tempArray = [];
    for (let user of room.users) {
      if (user.id !== currentUser.id) {
        tempArray.push(user);
      }
    }
    return tempArray[0].username;
  }

  function getInputValue(text) {
    setMsgToSend(text);
    setTyping(true);
  }

  return (
    <div className="chatWrapper" style={cosStyles.chatWrapper}>
      {currentUser && currentUser.chatrooms.length && (
        <>
          <div className="people" style={cosStyles.people}>
            <ChatBox
              emitFromChatBox={pullChildData}
              sendTo={chatRoom !== undefined ? chatRoom : null}
            />
          </div>

          <div style={{ position: "relative", height: "500px" }}>
            <MainContainer>
              <ChatContainer>
                <MessageList>
                  <>
                    {typing && (
                      <TypingIndicator
                        content={currentUser.username + " is typing"}
                      />
                    )}
                    {chatRoom.messages && chatRoom.messages.length > 0
                      ? chatRoom.messages.map((msg, i) => (
                          <>
                            <ChatMessage
                              key={i}
                              message={msg}
                              sendTo={chatRoom}
                              otherUser={otherUserName}
                            />
                          </>
                        ))
                      : " "}
                    {messages &&
                      messages.length > 0 &&
                      messages.map((msg, i) => (
                        <>
                          <ChatMessage
                            key={i}
                            message={msg}
                            sendTo={chatRoom}
                            otherUser={otherUserName}
                          />
                        </>
                      ))}
                  </>
                </MessageList>
              </ChatContainer>
            </MainContainer>

            {chatRoom && (
              <div style={cosStyles.inputWrapper} className="chatWrapper">
                <form action="" onSubmit={handleSubmit} style={cosStyles.form}>
                  <input
                    type="text"
                    style={cosStyles.input}
                    onChange={(e) => getInputValue(e.target.value)}
                    value={msgToSend}
                    onSubmit={handleSubmit}
                  />

                  <button style={cosStyles.sendBtn}>Send</button>
                </form>
              </div>
            )}
          </div>
        </>
      )}
      {currentUser && !currentUser.chatrooms && (
        <div>
          <h3>You have no chat messages</h3>
        </div>
      )}
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
