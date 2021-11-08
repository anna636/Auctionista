import React, { useContext, useEffect } from "react";
import { useMessage } from "../../contexts/MessageContext";
import { UserContext } from "../../contexts/UserContext";

function ChatBox(props) {
  const { userChatRooms, setUserChatRooms } = useMessage();
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    getUserChatRooms();
  }, [currentUser]);

  function getUserChatRooms() {
    let tempRoomsArray = [];
    for (let room of currentUser.chatrooms) {
      tempRoomsArray.push(room);
    }
    setUserChatRooms(tempRoomsArray);
  }

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
      {userChatRooms && userChatRooms.length > 0
        ? userChatRooms.map((room, index) => (
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
              <p>
              Chat with: {getOtherUserName(room)}
              </p>
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
