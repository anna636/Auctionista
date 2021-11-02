import { emit } from "../websockets/socket.jsx";
import { useState } from "react";
import { Button } from "react-bootstrap";


function Chat() {
  const [inputMessage, setInputMessage] = useState("");


  function handleSubmit() {
    let data = {
      user: "Ziggy",
      message: inputMessage,
    };

    postMessage(data);
  }

  async function postMessage(data) {
    console.log('Postmessage')
    await fetch("/api/message", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });


  }

  function join() {
    console.log('Join')
    emit('join', inputMessage)
    setInputMessage("")
  }

  function leave() {
    console.log('Leave')
    emit('leave', inputMessage)
    setInputMessage("")
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
      <Button
       onClick={join}
      >
        Join
      </Button>
      <br />
      <Button
       onClick={leave}
      >
        Leave
      </Button>
    </div>
  );
}

export default Chat;
