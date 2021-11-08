import React, { useState, useEffect } from "react";
import { Button, Toast, Row, Col} from "react-bootstrap";

function NotificationBubble(){
  const [showA, setShowA] = useState(true);
  const [showB, setShowB] = useState(true);

  const toggleShowA = () => setShowA(!showA);
  const toggleShowB = () => setShowB(!showB);

  return (
    <Row>
    <Col md={6} className="mb-2">
      <img src="https://i.imgur.com/gBi4P58.png" onClick={toggleShowA} className="mb-2" style={styles.bell}>
      </img>
      <Toast show={showA} onClose={toggleShowA}>
        <Toast.Header>
          <img
            src="holder.js/20x20?text=%20"
            className="rounded me-2"
            alt=""
          />
          <strong className="me-auto">Bootstrap</strong>
          <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
      </Toast>
    </Col>
  </Row>
  );

  
  
  
}
export default NotificationBubble;

const styles = {
  bell: {
    backgroundColor: "white",
    width: "50px",
    height: "50px"
  }
};