import { useSocketContext } from "../contexts/SocketContext";
import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import MessageList from "../components/MessageList.jsx";
import { UserContext } from "../contexts/UserContext";
import { useGlobalContext } from "../contexts/GlobalContext";

function Chat() {
  const { socket } = useSocketContext();
  const { roomid } = useParams();
  const [inputMessage, setInputMessage] = useState("");
  const { currentUser } = useContext(UserContext);
  const { context, setContext, getRoomById } = useGlobalContext();
  const [connected, setConnected] = useState(false);
  const [room, setRoom] = useState();

  useEffect(() => {
    connect();
  }, []);

  useEffect(() => {
    const join = () => {
      console.log("Join");
      socket.emit("join", "" + roomid);
    };
    join();
  }, []);

  useEffect(() => {
    getRoom();
  }, [roomid]);

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

  const getRoom = async () => {
    let fetchedRoom = await getRoomById(roomid);
    console.log("From Chat: ", fetchedRoom);
    setRoom(fetchedRoom);
  };

  function handleSubmit() {
    let data = {
      chatroom: room,
      userId: currentUser.id + "",
      message: inputMessage,
    };
    postMessage(data);

    console.log("Context: ", context)

    setInputMessage("");
  }

  async function postMessage(data) {
    console.log("Postmessage");
    await fetch("/api/message/" + roomid, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });

    // updateContext({
    //   messages: [...context.messages, data.message],
    // });
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
      {connected && room && (
        <>
          <div>
            {room.messages.map((messageObject, i) => (
              <div
                key={i}
                className="message-container"
                style={styles.messageContainer}
              >
                <p>UserId: {messageObject.userId}: </p>
                <p>{messageObject.message}</p>
              </div>
            ))}
            <MessageList />
          </div>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <button onClick={handleSubmit}>Submit</button>
          <br />
        </>
      )}
    </div>
  );
}

export default Chat;

const styles = {
  messageContainer: {
    border: "solid 1px grey",
    borderRadius: "5px",
    width: "10rem",
  },
};
