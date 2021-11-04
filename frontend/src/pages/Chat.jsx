import { useSocketContext } from "../contexts/SocketContext";
import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import MessageList from "../components/MessageList.jsx";
import { UserContext } from "../contexts/UserContext";
import { useGlobalContext } from "../contexts/GlobalContext";

function Chat() {
  const { socket } = useSocketContext();
  const { sellerid } = useParams();
  const [inputMessage, setInputMessage] = useState("");
  const { currentUser } = useContext(UserContext);
  const { context, updateContext } = useGlobalContext();
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    connect();
  }, []);

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
      updateContext({
        user: data.user,
        messages: [...context.messages, data.message],
      });
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

  useEffect(() => {
    const join = () => {
      console.log("Join");
      socket.emit("join", "chat-room-" + sellerid);
    };
    join();
  }, [connected]);


  function handleSubmit() {
    let data = {
      user: currentUser,
      message: inputMessage,
    };
    postMessage(data);

    setInputMessage("");
  }

  async function postMessage(data) {
    console.log("Postmessage");
    await fetch("/api/message", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
  }

  // function leave() {
  //   console.log("Leave");
  //   emit("leave", inputMessage);
  //   setInputMessage("");
  // }

  return (
    <div>
      <h1>Chat page</h1>
      <br />
      {!connected && (
        <div>
          <p>Connecting...</p>
        </div>
      )}
      {connected && (
        <>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <button onClick={handleSubmit}>Submit</button>
          <br />
          <MessageList />
        </>
      )}
    </div>
  );
}

export default Chat;
