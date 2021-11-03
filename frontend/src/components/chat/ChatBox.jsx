import React, {useState, useEffect, useContext} from 'react'
import { useMessage } from "../../contexts/MessageContext";

function ChatBox(prop) {
  const { chatsWith } = useMessage();
  

   function sendUseraneme(username) {
     prop.func(username);
   }
  return (
    <div className="chatsWrapper">
      {chatsWith && chatsWith.length > 0
        ? chatsWith.map((user, index) => (
            <div className="userWrapper" style={styles.userWrapper} onClick={() => sendUseraneme(user)}>
              <img
                src="https://www.pngkit.com/png/full/128-1280585_user-icon-fa-fa-user-circle.png"
              alt=""
              style={styles.img}
              />
              <p>{user}</p>
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
    cursor:"pointer"
  },
  img: {
    width: "20%",
    marginBottom:"2vh"
  },
};
