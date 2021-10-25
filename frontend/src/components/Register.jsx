import React from 'react'
import "bootstrap/dist/css/bootstrap.css";
import styled from "styled-components";
import { UserContext } from "../contexts/UserContext"
import { useState, useEffect, useContext } from "react";
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";

export function Register(props) {
  const {
    modal, toggle
  } = props;
  const { register , whoAmI } = useContext(UserContext)
  const [loggedIn, setLoggedIn] = useState(false);

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmedPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState(false)
  const [successMsg, setSuccessMsg] = useState(false)
  async function logIn(e) {
    e.preventDefault()
    let user = {
      username: username,
      password: password,
      fullName: fullName,
      email: email
    }
    const response = await register(user)
    if (response.error) {
      setErrorMessage(true);
    } else if (response.success) {
      setErrorMessage(false)
      setSuccessMsg(true)

      var delayInMilliseconds = 1000; //1 second

      setTimeout(function () {
        whoAmI()
      
      }, delayInMilliseconds);

    }
    setLoggedIn(true);
  }
  return(
    <div>
      <Modal show={modal} onHide={toggle}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <div className="input-login-div-wrap">
        <div className="input-login-div line">
          <InputGroup className="mb-3">
          <FormControl
            aria-describedby="inputGroup-sizing-default"
            required
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          </InputGroup>
          </div>
          <div className="input-login-div line">
          <InputGroup className="mb-3">
          <FormControl
            aria-describedby="inputGroup-sizing-default"
            required
            type="text"
            placeholder="Fullname"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          </InputGroup>
          </div>
          <div className="input-login-div line">
          <InputGroup className="mb-3">
          <FormControl
            aria-describedby="inputGroup-sizing-default"
            required
            type="text"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          </InputGroup>
          </div>
          <div className="input-login-div">
          <InputGroup className="mb-3">
          <FormControl
            aria-describedby="inputGroup-sizing-default"
            required
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          </InputGroup>
          </div>
          <div className="input-login-div">
          <InputGroup className="mb-3">
          <FormControl
            aria-describedby="inputGroup-sizing-default"
            required
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
          /> 
          </InputGroup>
          </div>
        </div>
        <Modal.Footer>
          <Button color="primary" onClick={(e) => logIn(e)}>Login</Button>{' '}
        </Modal.Footer>
      </Modal>
    </div>
  );
};
