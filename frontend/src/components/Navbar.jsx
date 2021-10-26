import React from 'react'
import "bootstrap/dist/css/bootstrap.css";
import styled from "styled-components";
import { UserContext } from "../contexts/UserContext"
import { useState, useEffect, useContext } from "react";
import { NavDropdown, Modal, Button } from "react-bootstrap";
import { Login } from "../components/Login"
import { Register } from "../components/Register"
import { Link } from 'react-router-dom';


function Navbar() {
  const {getCurrentUser, logout} = useContext(UserContext)
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  const toggleLogin = () => setLogin(!login);
  const toggleRegister = () => setRegister(!register);
  console.log("current user is" ,getCurrentUser())


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
      {!getCurrentUser() ? (
        <div>
          <div>
            <Button onClick={toggleLogin}>Login</Button>
            <Login toggle={toggleLogin} modal={login}></Login>
          </div>
          <div>
            <Button onClick={toggleRegister}>Register</Button>
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

              <NavDropdown.Item href="#action/3.2">
                Current listings
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Chat</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">My profile</NavDropdown.Item>
              <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4" onClick={logout}>Log out</NavDropdown.Item>
            </NavDropdown>
          </ul>
        </div>
      )}
      <div
        class="collapse navbar-collapse"
        id="navbarNavDropdown"
        style={styles.ul}
      ></div>
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
