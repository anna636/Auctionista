import React from 'react'
import "bootstrap/dist/css/bootstrap.css";
import styled from "styled-components";
import { UserContext } from "../contexts/UserContext"
import { useState, useEffect, useContext } from "react";
import { NavDropdown, Modal, Button } from "react-bootstrap";



function Navbar() {

  const [show, setShow] = useState(false);
  const { login,getCurrentUser, whoAmI } = useContext(UserContext)
   const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [loggedIn, setLoggedIn] = useState(false);

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(false)
  const [successMsg, setSuccessMsg] = useState(false)
  async function logIn(e) {
    e.preventDefault()
    let user = {
      username: username,
      password: password
    }
    const response = await login(user)
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
  const [currentUser, setCurrentUser] = useState("haha")
  return (
    <nav class="navbar navbar-expand-lg navbar-dark" style={styles.navbar}>
      <a class="navbar-brand" href="/" style={styles.mainName}>
        Auctionista
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div>
        <form class="form-inline" style={styles.form}>
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button
            class="btn btn-outline-secondary my-2 my-sm-0"
            type="submit"
            style={styles.formButton}
          >
            Search
          </button>
        </form>
      </div>
     
      {!loggedIn &&
        
      <Button variant="primary" onClick={handleShow}>
        Login
      </Button>
        }
      
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <div className="input-login-div-wrap">
          <div className="input-login-div line">
            <input
              className="myModalInput"
              type="text"
              required
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-login-div">
            <input
              className="myModalInput"
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
        </div>
       
        
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button color="primary" onClick={(e) => logIn(e)}>Login</Button>{' '}
        </Modal.Footer>
      </Modal>
      
      {loggedIn &&
        <div
          class="collapse navbar-collapse"
          id="navbarNavDropdown"
          style={styles.ul}
        >
          <ul class="navbar-nav">
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="Hello #username"
              menuVariant="dark"
            >
              <NavDropdown.Item href="#action/3.1">
                Create new auction
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Current listings
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Chat</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">My profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Log out</NavDropdown.Item>
            </NavDropdown>
          </ul>
        </div>
      }
        <div
          class="collapse navbar-collapse"
          id="navbarNavDropdown"
          style={styles.ul}
        >
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="#">
                Home
              </a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="#">
                Log in
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar


const styles = {
  navbar: {
    backgroundColor: "black",
    padding: "1vw 2vw 1vw 3vw",
    color: "white",
  },

  ul: {
    fontSize: "1.2em",
    paddingLeft: "8vw",
  },
  mainName: {
    fontSize: "1.7em",

  },
  form: {
    display: "flex",
    flexDirection: "row",
    width: "50vw",
    marginLeft: "8vw",
  },

  formButton: {
    marginLeft: "1vw",
    color: "rgb(226, 89, 55)",
    borderColor: "rgb(226, 89, 55)",
    backgroundColor: "black",
  },
};
