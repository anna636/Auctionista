import React from 'react'
import "bootstrap/dist/css/bootstrap.css";
import styled from "styled-components";
import { UserContext } from "../contexts/UserContext"
import { useState, useContext } from "react";
import { Modal, InputGroup, FormControl } from "react-bootstrap";

const ErrorMessage = styled.span`
  display: flex;
  justify-content: center;
  background: red;
  color: white;
  `

const SuccessMessage = styled.span`
  display: flex;
  justify-content: center;
  background: green;
  color: white;
`

export function Login(props) {
  const {
    modal, toggle
  } = props;
  const { login, whoAmI} = useContext(UserContext)


  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(false)
  const [successMsg, setSuccessMsg] = useState(false)
  const targetUri = "http://localhost:3000/oauth2/redirect";
  const baseUri = "http://localhost:8080";

   function openPopup() {
     props.func(true);
   }


 
  
  async function logIn(e) {
    e.preventDefault();
    setErrorMessage(false);
    let user = {
      email: username,
      password: password,
    };
    const response = await login(user)
    

    if (response !== null) {
        
      console.log("login successfull with token!");
     openPopup()
    }
    else {
      
      console.log("smth went wrong when trying to login")
    }

    /*  if (response.accessToken) {
      setErrorMessage(true)
      whoAmI()
    }
    if (!response.error) {
      openPopup()
    } */

    return response;
  }
  return (
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
          {errorMessage && <ErrorMessage>Bad credentials</ErrorMessage>}
          {successMsg && <SuccessMessage>Login successfull</SuccessMessage>}
        </div>

        <Modal.Footer>
          <button class="btn btn-dark btn-lg" onClick={(e) => logIn(e)}>
            Login
          </button>{" "}
          <span>OR</span>
          <a
            href={
              baseUri + "/oauth2/authorize/google?redirect_uri=" + targetUri
            }
          >
            <img
              className="socialImg google"
              style={styles.socialImg}
              src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
              alt=""
            />
          </a>
          <img
            className="socialImg facebook"
            style={styles.socialImg}
            src="https://www.freepnglogos.com/uploads/facebook-logo-png-6.png"
            alt=""
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const styles = {
  socialImg: {
    width: "5%",
    
  }
}