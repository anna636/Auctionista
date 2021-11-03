import { emit } from "../Socket"
import { useState } from "react";
import { Button } from "react-bootstrap";
import MessageList from "../components/MessageList.jsx";

function Chat() {
  const [inputMessage, setInputMessage] = useState("");

  function handleSubmit() {

    let data = {
      // change user to current user
      user: "Ziggy",
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

  function join() {
    console.log("Join");
    emit("join", inputMessage);
    setInputMessage("");
  }

  function leave() {
    console.log("Leave");
    emit("leave", inputMessage);
    setInputMessage("");
  }

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
      <Button onClick={join}>Join</Button>
      <br />
      <Button onClick={leave}>Leave</Button>
      <br />
      <MessageList />
    </div>
  );
}

export default Chat;
