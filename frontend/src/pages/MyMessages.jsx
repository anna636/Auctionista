import React, { useContext } from "react";
import { Link } from "react-router-dom"
import { useGlobalContext } from "../contexts/GlobalContext";
import { UserContext } from "../contexts/UserContext";


function MyMessages() {
  const { context } = useGlobalContext();
  const { currentUser } = useContext(UserContext);


  return (
    <div>
      <h4>My messages</h4>
      {currentUser && (
        <div>
          {currentUser.chatrooms.length && (
            <div>
              {currentUser.chatrooms.map((room) => (
                <div key={room.id}>
                  <Link to={"/chat/" + room.id }>Room ID: </Link>
                  {room.id}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MyMessages;
