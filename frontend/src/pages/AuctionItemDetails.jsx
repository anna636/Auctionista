import React from "react";
import Counter from "../components/Counter";
import { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useAuctionItem } from "../contexts/AuctionItemContext";
import {
  Button,
  Container,
  Col,
  Row,
  Card,
  Form,
  OverlayTrigger,
  Tooltip,
  Spinner,
  Carousel,
} from "react-bootstrap";
import { useBidContext } from "../contexts/BidContext";
import { UserContext } from "../contexts/UserContext";
import CustomModal from "../components/CustomModal";
import { useMessage } from "../contexts/MessageContext";
import { useSocketContext } from "../contexts/SocketContext";

import PaymentModal from "../components/PaymentModal";

function AuctionItemDetails() {
  const { id } = useParams();
  const history = useHistory();
  const { fetchAuctionItem, specificItem} = useAuctionItem();
  //const [auctionItem, setAuctionItem] = useState();
  const { postNewBid } = useBidContext();
  const [bid, setBid] = useState("");
  const { currentUser, whoAmI } = useContext(UserContext);
  const [myProp, setMyProp] = useState({});
  const [highestBid, setHighestBid] = useState();
  const [itemImages, setItemImages] = useState([]);
  const { createNewRoom } = useMessage();
    const { socket } = useSocketContext();

  const [showPayment, setShowPayemtn] = useState(false);

  useEffect(() => {
    getAuctionItem(id);

    onNotif();
  }, [id, highestBid]);

  const toggleShowPayment = () => {
    setShowPayemtn(!showPayment);
  };

  async function sendNotif() {
    let toSend = {
      updateItemId: specificItem.id,
    };

    

    let response = await fetch("/api/bid-notifs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(toSend),
    });

   
  }

  async function sendOutbiddenNotif() {
    let outbiddenNotif = {
      fromLogin: currentUser.username,
      toWho: specificItem.bids[specificItem.bids.length - 1].user_id,
      auctionItemid: specificItem.id,
    };
    
    if (specificItem.bids[specificItem.bids.length - 1].user_id !== currentUser.id.toString()) {
      let res = await fetch("/api/outbidden", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(outbiddenNotif)
    }); 
    }
    else {
      console.log("Last bid was your own bid")
    }
     
  }
  const getAuctionItem = async (auctionItemId) => {
    let fetchedItem = await fetchAuctionItem(auctionItemId);
    //setAuctionItem(fetchedItem);
    orderImages(specificItem);
  };

  function orderImages(auctionItem) {
    const origImageArray = specificItem.images.split(",");
    const imageArrayInOrder = [];

    imageArrayInOrder.push(origImageArray[specificItem.primaryImgIndex]);
    origImageArray.splice(specificItem.primaryImgIndex, 1);

    if (origImageArray.length) {
      for (let image of origImageArray) {
        imageArrayInOrder.push(image);
      }
    }

    setItemImages(imageArrayInOrder);
  }

  const checkUser = () => {
    if (currentUser) {
      return currentUser.id === specificItem.owner.id ? false : true;
    } else {
      return true;
    }
  };

  async function placeBid(bool) {
    toggleShowPayment();

    if (bool) {
      if (currentUser === null || currentUser === undefined) {
        setMyProp({
          show: true,
          text: "You must log in to place a bid",
        });
        return;
      }

      if (checkBid) {
        let newBid = {
          amount: parseInt(bid),
          time: new Date(),
          user_id: currentUser.id.toString(),
          auctionItem: specificItem,
        };

        let res = await postNewBid(newBid);
        if (res) {
          setHighestBid(bid);
          setMyProp({
            show: true,
            colour: "green",
            text: "Bid placed!",
          });
          setBid("");
          sendNotif()
          sendOutbiddenNotif()
        } else {
          setMyProp({
            show: true,
            colour: "red",
            text: "Something went wrong, bid not placed",
          });
        }
      } else {
        console.log("Bid too low");
      }
    }
  }

  function checkBid() {
    return bid >= specificItem.minimumBid ? true : false;
  }

  const pull_data = (data) => {
    console.log(data);
    if (data === false) {
      setMyProp({
        show: false,
        colour: "",
        text: "",
      });
    }
  };

    const onNotif = () => {
      socket.on("notifications", function (data) {
        if (data.updateItemId !== "all") {
           if (window.location.pathname === "/details/" + data.updateItemId) {
             fetchAuctionItem(data.updateItemId)
             
        }
        
        }
       
        
      });
  };
  
  async function onClickChat() {
    let existingRoom = checkForExistingChatRooms()
    if (!existingRoom) {
      let chatRoomItem = {
        users: [currentUser, specificItem.owner],
      };
      let newRoom = await createNewRoom(chatRoomItem);
      if (newRoom) {
        whoAmI();
        history.push("/my-messages/" + newRoom.id);
      }
    } else {
      history.push("/my-messages/" + existingRoom.id);
    }
  }

  function checkForExistingChatRooms() {
    let existingRoom = null
    if (currentUser.chatrooms.length > 0) {
      for (let room of currentUser.chatrooms) {
        for (let user of room.users) {
          if (user.id === specificItem.owner.id) {
            existingRoom = room;
          }
        }
      }
    }
    return existingRoom
  }

  return (
    <div style={styles.mainPage}>
      {!specificItem && (
        <Spinner animation="border" role="status" className="mt-5">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {specificItem && (
        <Container className="p-5" fluid>
          <Row>
            <Col>
              <h2>{specificItem.title}</h2>
              <p>{specificItem.description}</p>
              <Card>
                <Card.Title className="mt-3">
                  Current price:{" "}
                  {specificItem.bids.length
                    ? specificItem.bids[specificItem.bids.length - 1].amount
                    : specificItem.startPrice}{" "}
                  <span>
                    <i class="bi bi-currency-bitcoin"></i>{" "}
                  </span>
                </Card.Title>
                {!checkUser() && (
                  <Card.Body>
                    <p className="text-success">
                      This is your auction item{" "}
                      <i class="bi bi-emoji-smile"></i>
                    </p>
                  </Card.Body>
                )}
                {checkUser() && (
                  <Card.Body>
                    <Form className="mx-5">
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip id="tooltip-top">
                            The minimum bid that can be placed is:{" "}
                            <strong>{specificItem.minimumBid}</strong>{" "}
                            <span>
                              <i class="bi bi-currency-bitcoin"></i>{" "}
                            </span>
                          </Tooltip>
                        }
                      >
                        <Form.Control
                          size="sm"
                          type="number"
                          max="1000000"
                          min={specificItem.minimumBid}
                          value={bid}
                          onChange={(e) => setBid(e.target.value)}
                        ></Form.Control>
                      </OverlayTrigger>
                      <Button
                        variant="success"
                        className="mt-2"
                        onClick={toggleShowPayment}
                      >
                        Place bid
                      </Button>
                    </Form>
                    {myProp.show === true && (
                      <div style={{ color: "green" }} className="mt-2">
                        <strong> Your bid: {highestBid} </strong>
                        <span>
                          <i class="bi bi-currency-bitcoin"></i>{" "}
                        </span>
                      </div>
                    )}
                  </Card.Body>
                )}
                <Card.Footer>
                  <Counter dateFrom={specificItem.deadline}></Counter>
                </Card.Footer>
              </Card>
            </Col>
            <Col>
              {itemImages.length > 1 && (
                <Carousel variant="dark">
                  {itemImages.map((image) => (
                    <Carousel.Item style={{ width: "50rem" }}>
                      <div style={styles.imageContainer}>
                        <img src={image} alt="" style={{ height: "100%" }} />
                      </div>
                    </Carousel.Item>
                  ))}
                </Carousel>
              )}
              {itemImages.length <= 1 && (
                <div style={styles.imageContainer}>
                  <img src={itemImages[0]} alt="" style={{ height: "100%" }} />
                </div>
              )}
              <br />
              {checkUser() && (
                <>
                  <Button onClick={onClickChat}>Chat with seller</Button>
                </>
              )}
            </Col>
          </Row>
          <CustomModal prop={myProp} func={pull_data} />
          <PaymentModal
            toggle={toggleShowPayment}
            modal={showPayment}
            payment={bid}
            func={placeBid}
          />
        </Container>
      )}
    </div>
  );
}

export default AuctionItemDetails;

const styles = {
  imageContainer: {
    height: "25rem",
    marginRight: "0",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
  },
  owner: {
    textAlign: "right",
    paddingRight: "2vw",
  },
};
