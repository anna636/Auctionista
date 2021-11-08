import React, { useContext, useEffect } from 'react'
import { useMessage } from "../../contexts/MessageContext";
import { UserContext } from "../../contexts/UserContext";

function ChatBox(props) {
  const { chatsWith, setChatsWith } = useMessage();
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    getUserChats()
  }, [currentUser])
  

  function getUserChats() {
    let userChatRooms = []
    for (let room of currentUser.chatrooms) {
      userChatRooms.push(room)
    }
    setChatsWith(userChatRooms)
  }

  
   function emitChatRoom(room) {
     props.emitFromChatBox(room);
  }
  
 
  return (
    <div className="chatsWrapper" style={styles.chatsWrapper}>
      {chatsWith && chatsWith.length > 0
        ? chatsWith.map((room, index) => (
            <div className="userWrapper" style={props.sendTo === room ? styles.chosen : styles.userWrapper} onClick={() => emitChatRoom(room)}>
              <img
                src="https://www.pngkit.com/png/full/128-1280585_user-icon-fa-fa-user-circle.png"
              alt=""
              style={styles.img}
              />
            <p>Room ID: {room.id}</p>
            
            </div>
          ))
        : null}
    </div>
  );
}

export default ChatBox

const styles = {
  userWrapper: {
    display: "flex",
    flexDirection: "row",
    fontSize: "1.5em",
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
    fontSize: "1.5em",
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
