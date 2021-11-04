import { emit } from "../Socket"
import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import MessageList from "../components/MessageList.jsx";
import { UserContext } from "../contexts/UserContext";
import { useGlobalContext } from "../contexts/GlobalContext";

function Chat() {
  const { sellerid } = useParams();
  const [inputMessage, setInputMessage] = useState("");
  const { currentUser } = useContext(UserContext);
  const { connectedToRoom} =
    useGlobalContext();

  useEffect(() => {
    const join = () => {
      console.log("Join");
      emit("join", "chat-room-" + sellerid);
    }
    
    join()
  },[connectedToRoom])

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
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
      <br />
      <MessageList />
    </div>
  );
}

export default Chat;
