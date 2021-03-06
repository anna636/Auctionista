import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMessage } from "../../contexts/MessageContext";
import { UserContext } from "../../contexts/UserContext";

function ChatBox(props) {
  const { roomid } = useParams();
  const { currentUser } = useContext(UserContext);
  const { chatRooms } = useMessage();


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

  const selectedChat = (room) => {
    return roomid == room.id
      ? styles.chosen
      : styles.userWrapper;
  }

  return (
    <div className="chatsWrapper" style={styles.chatsWrapper}>
      {chatRooms && chatRooms.length > 0
        ? chatRooms.map((room) => (
            <div
              key={room.id}
              className="userWrapper"
              style={selectedChat(room)}
              onClick={() => emitChatRoom(room)}
            >
              <img
                src="https://www.pngkit.com/png/full/128-1280585_user-icon-fa-fa-user-circle.png"
                alt=""
                style={styles.img}
            />
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
