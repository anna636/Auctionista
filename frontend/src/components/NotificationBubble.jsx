import React, { useState, useEffect } from "react";
import { Button, Toast, Row, Col} from "react-bootstrap";
import { useSocketContext } from "../contexts/SocketContext";
function NotificationBubble() {
  const [showA, setShowA] = useState(false);
  const toggleShowA = () => setShowA(!showA);
  const [connected, setConnected] = useState(false);
  const { socket } = useSocketContext();
  function connect() {
    setEventListeners();
  }
  function setEventListeners() {
    socket.on("connect", () => {
      setConnected(true);
      console.log("socket connected");
    });
  }
    useEffect(() => {
      connect();
    }, []);

  return (
    <Row>
    <Col md={6} className="mb-2">
      <img src="https://i.imgur.com/x3cOhhz.png" onClick={toggleShowA} className="mb-2" style={styles.bell}>
      </img>
      <Toast bg='dark' show={showA} onClose={toggleShowA} style={styles.toastBody} >
        <Toast.Header bg='dark'>
          <img
            src="holder.js/20x20?text=%20"
            className="rounded me-2"
            alt=""
          />
          <strong className="me-auto">Notification</strong>
          <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body>You have been outbid on: #auctionItem.title new bid is: #CurrentBid
          <button>Place new bid: #auctionItem.title</button>
        </Toast.Body>
      </Toast>
    </Col>
  </Row>
  );



}
export default NotificationBubble;

const styles = {
  bell: {
    width: "20px",
    height: "20px",
    marginLeft: "20px"
  },
  toastBody: {
    position: "fixed",
  }
};