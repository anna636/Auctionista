import React, { useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
} from "@chatscope/chat-ui-kit-react";
import { useMessage } from "../contexts/MessageContext";
import { UserContext } from "../contexts/UserContext";
import ChatBox from "../components/chat/ChatBox";
import ChatMessage from "../components/chat/ChatMessage";


function MyMessages() {

  return (
    <div>
     <h1>This is my messages</h1>
    </div>
  );
}

export default MyMessages;

const cosStyles = {
  chatWrapper: {
    display: "grid",
    gridTemplateColumns: "30% 70%",
    padding: "5vh 3vw 5vh 1vw",
    gap: "1vw",
    height: "100vh",
  },
  people: {
    width: "100%",
    backgroundColor: "#c6e3fa",
    borderRadius: "10px",
    height: "87%",
    padding: "2vw 2vw 2vw 2vw",
    overflowY: "scroll",
  },
  inputWrapper: {
    width: "100%",
    height: "10vh",
    borderRadius: "10px",
    border: "1px solid lightGrey",
    marginTop: "3vh",
    display: "grid",
    gridTemplateColumns: "90% 10%",
    alignItems: "center",
    justifyContent: "center",
  },

  input: {
    backgroundColor: "#c6e3fa",
    border: "none",
    borderRadius: "5px",
    height: "100%",
    width: "100%",
    marginLeft: "5vw",
  },

  sendBtn: {
    width: "50%",
    marginLeft: "13vh",
    border: "none",
    color: "black",
    backgroundColor: "#c6e3fa",
    borderRadius: "10px",
    fontFamily: `"Trebuchet MS", Helvetica, sans-serif`,
  },
  form: {
    display: "grid",
    gridTemplateColumns: "70% 30%",

    flexDirection: "row",
  },
  selectRoomContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
};
