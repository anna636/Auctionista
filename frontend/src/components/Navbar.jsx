import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import styled from "styled-components";
import { UserContext } from "../contexts/UserContext"
import { useState, useEffect, useContext } from "react";
import { NavDropdown, Modal, Button } from "react-bootstrap";
import { Login } from "../components/Login"
import { Register } from "../components/Register"
import { Link } from 'react-router-dom';
import Search from "./search/Search";



function Navbar() {
  const {getCurrentUser, logout} = useContext(UserContext)
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  const toggleLogin = () => setLogin(!login);
  const toggleRegister = () => setRegister(!register);
  


  useEffect(() => {
    getCurrentUser()

  }, []);

  return (
    <nav class="navbar navbar-expand-lg navbar-dark" style={styles.navbar}>
      <a class="navbar-brand" style={styles.mainName}>
        <Link to="/" className="link">
          {" "}
          Auctionista
        </Link>
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
        <Search />
      </div>
      { !getCurrentUser() ? (
      <div style={styles.loginButtons}>
        <div>
            <button  class="btn btn-outline-light btn-lg" onClick={toggleLogin}>Login</button>
      <Login toggle={toggleLogin} modal={login}></Login>
      </div>
      <div style={styles.registerButton}>
            <button class="btn btn-outline-light btn-lg" onClick={toggleRegister}>Register</button>
      <Register toggle={toggleRegister} modal={register}></Register>
      </div>
      </div>
      ) : (
        <div
          class="collapse navbar-collapse"
          id="navbarNavDropdown"
          style={styles.ul}
        >
          <ul class="navbar-nav">
            <NavDropdown
              id="nav-dropdown-dark-example"
              title={"Hello " + getCurrentUser().username}
              menuVariant="dark"
            >
              <NavDropdown.Item>
                <Link to="/create-new-listing" className="link">
                  Create new auction
                </Link>
              </NavDropdown.Item>

              <NavDropdown.Item>
                <Link to="/my-listings" className="link">
                  Current listings
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Chat</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">My profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4" onClick={logout}>
                Log out
              </NavDropdown.Item>
            </NavDropdown>
          </ul>
        </div>
      )}
        <div
          class="collapse navbar-collapse"
          id="navbarNavDropdown"
          style={styles.ul}
        >
          
        </div>
  
    
    </nav>
  );
}

export default Navbar;


const styles = {
  navbar: {
    backgroundColor: "black",
    padding: "1vw 2vw 1vw 3vw",
    color: "white",
  },
  loginButtons: {
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    right: "0",
    marginRight: "60px",
  },
  registerButton: {
    marginLeft: "10px",
  },

  ul: {
    fontSize: "1.2em",
    paddingLeft: "8vw",
  },
  mainName: {
    fontSize: "1.7em",
  },
  
};
