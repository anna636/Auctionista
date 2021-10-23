import React from 'react'
import "bootstrap/dist/css/bootstrap.css";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { NavDropdown } from "react-bootstrap";


function Navbar() {

  const [currentUser, setCurrentUser]=useState("haha")
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

      {currentUser != null ? (
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
      ) : (
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
