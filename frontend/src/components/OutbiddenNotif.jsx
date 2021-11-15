import React, {useState, useEffect, useContext} from 'react'
import { useSocketContext } from "../contexts/SocketContext";
import { UserContext } from "../contexts/UserContext";

function OutbiddenNotif() {
  const { socket } = useSocketContext();
  const [myNotif, setMyNotif] = useState(false)
  const { whoAmI, getCurrentUser, currentUserId } = useContext(UserContext);
 

  useEffect(async () => {
    let res=await whoAmI();
    
    onOutbidden()
     
    
  }, [])
  
    const onOutbidden = () => {
      socket.on("outbidden", function (data) {
        
        console.log("ID " + currentUserId);
        console.log(typeof data.toWho)
        if (currentUserId == data.toWho) {
          console.log("this is your notification!")
        }
        
      });
    };
  return (
    <div>
      
    </div>
  )
}

export default OutbiddenNotif
