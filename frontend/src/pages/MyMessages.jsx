import React from "react";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";


function MyMessages() {
  
  return (
    <div className="chatWrapper" style={cosStyles.chatWrapper} >
      <div className="people" style={cosStyles.people}>

      </div>
      <div style={{ position: "relative", height: "500px" }}>
        <MainContainer>
          <ChatContainer>
            <MessageList>
              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "just now",
                  sender: "Joe",
                }}
              />
            </MessageList>
            <MessageInput placeholder="Type message here" />
          </ChatContainer>
        </MainContainer>
      </div>
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
  },
};