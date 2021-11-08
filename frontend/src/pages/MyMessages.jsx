import React, { useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
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
import { useSocketContext } from "../contexts/SocketContext";
import { useGlobalContext } from "../contexts/GlobalContext";

function MyMessages() {
  const history = useHistory();
  const { chatRoom, setChatRoom, messages, setMessages } = useMessage();
  const [msgToSend, setMsgToSend] = useState("");
  const { getCurrentUser, currentUser } = useContext(UserContext);
  const [typing, setTyping] = useState(false);
  const [otherUserName, setOtherUserName] = useState("");
  const { socket } = useSocketContext();
  const [connected, setConnected] = useState(false);
  const { context, setContext, getRoomById } = useGlobalContext();

  useEffect(() => {
    getCurrentUser();
  }, [chatRoom]);

  useEffect(() => {
    connect();
  }, [context]);

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
      setContext([...context, data.message]);
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

  // ******** Change getCurrentUser to currentUser

  function sendNewMsg(e) {
    e.preventDefault();
    let msg = {
      fromLogin: getCurrentUser().username, //Who sends msg
      message: msgToSend, //text of msg
    };
    if (chatRoom !== "") {
      sendMessage(chatRoom, msg); //First - who will recieve the msg, second - message itself
      setMessages([...messages, msg]);
      setMsgToSend("");
      setTyping(false);
      console.log(messages);
    } else {
      console.log("sending to null user");
    }
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
                  {typing ? (
                    <TypingIndicator
                      content={getCurrentUser().username + " is typing"}
                    />
                  ) : (
                    " "
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
