import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMessage } from "../../contexts/MessageContext";
import { UserContext } from "../../contexts/UserContext";

function ChatBox(props) {
  const { roomid } = useParams();
  const { currentUser } = useContext(UserContext);


  function emitChatRoom(room) {
    props.emitFromChatBox(room);
  }

  function getOtherUserName(room) {
    let tempArray = []
    for (let user of room.users) {
      if (user.id !== currentUser.id) {
        tempArray.push(user)
      }
    }
    return tempArray[0].username
  }

  return (
    <div className="chatsWrapper" style={styles.chatsWrapper}>
      <div>
        <h2>Room ID: {props.sendTo && props.sendTo.id}</h2>
      </div>
      {currentUser.chatrooms && currentUser.chatrooms.length > 0
        ? currentUser.chatrooms.map((room, index) => (
            <div
              key={index}
              className="userWrapper"
              style={props.sendTo === room ? styles.chosen : styles.userWrapper}
              onClick={() => emitChatRoom(room)}
            >
              <img
                src="https://www.pngkit.com/png/full/128-1280585_user-icon-fa-fa-user-circle.png"
                alt=""
                style={styles.img}
            />
            <p>{props.sendTo.id} === { room.id}</p>
              <p>Chat with: {getOtherUserName(room)}</p>
            </div>
          ))
        : " "}
    </div>
  );
}

export default ChatBox;

const styles = {
  userWrapper: {
    display: "flex",
    flexDirection: "row",
    fontSize: "1em",
    alignItems: "center",
    padding: "2vw 3vw 0 5vw",
    gap: "4vw",

    backgroundColor: "#d7e6f2",
    borderRadius: "10px",
    cursor: "pointer",
  },

  chosen: {
    display: "flex",
    flexDirection: "row",
    fontSize: "1em",
    alignItems: "center",
    padding: "2vw 3vw 0 5vw",
    gap: "4vw",

    backgroundColor: "white",
    borderRadius: "10px",
    cursor: "pointer",
  },

  img: {
    width: "20%",
    marginBottom: "2vh",
  },

  chatsWrapper: {
    display: "flex",
    gap: "2vh",
    flexDirection: "column",
  },
};
