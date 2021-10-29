import React from 'react'
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

function BootstrapModal(props) {
  const { modal, toggle, text } = props;
  
  

  return (
    <div>
      <Modal show={modal} onHide={toggle} className="bootstrapModal" style={styles.modal}>
        <Modal.Header closeButton>
          <Modal.Title>{ text}</Modal.Title>
        </Modal.Header>
       

      </Modal>
    </div>
  );
}

export default BootstrapModal

const styles = {
  modal: {
    borderRadius:"20%"
  }
}
