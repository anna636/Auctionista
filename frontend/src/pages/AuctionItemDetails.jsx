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

import PaymentModal from "../components/PaymentModal";
import { sendNotification } from "../components/chat/Socket";

function AuctionItemDetails() {
  const { id } = useParams();
  const history = useHistory();
  const { fetchAuctionItem, fetchedItem, fetchAuctionItem1 } = useAuctionItem();
  //const [auctionItem, setAuctionItem] = useState();
  const { postNewBid } = useBidContext();
  const [bid, setBid] = useState("");
  const { currentUser, whoAmI } = useContext(UserContext);
  const [myProp, setMyProp] = useState({});
  const [highestBid, setHighestBid] = useState();
  const [itemImages, setItemImages] = useState([]);


  const [showPayment, setShowPayemtn] = useState(false);

  useEffect(() => {
    getAuctionItem(id);
  }, []);

  const toggleShowPayment = () => {
    setShowPayemtn(!showPayment);
  };

  const getAuctionItem = async (auctionItemId) => {
   //let fetchedItem1 = await fetchAuctionItem1(auctionItemId);
    orderImages(fetchedItem);
  };

  function orderImages(auctionItem) {
    const origImageArray = fetchedItem.images.split(",");
    const imageArrayInOrder = [];

    imageArrayInOrder.push(origImageArray[fetchedItem.primaryImgIndex]);
    origImageArray.splice(fetchedItem.primaryImgIndex, 1);

    if (origImageArray.length) {
      for (let image of origImageArray) {
        imageArrayInOrder.push(image);
      }
    }

    setItemImages(imageArrayInOrder);
  }

  const checkUser = () => {
    if (currentUser) {
      return currentUser.id === fetchedItem.owner.id ? false : true;
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
          auctionItem: fetchedItem,
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
           let notif = {
             fromLogin: currentUser.email,
             message: fetchedItem.id,
             type: "notification",
           };
           sendNotification(notif);
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
    return bid >= fetchedItem.minimumBid ? true : false;
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

  async function onClickChat() {
   
        history.push("/my-messages");
     
  }

  function checkForExistingChatRooms() {
    let existingRoom = null
    if (currentUser.chatrooms.length > 0) {
      for (let room of currentUser.chatrooms) {
        for (let user of room.users) {
          if (user.id === fetchedItem.owner.id) {
            existingRoom = room;
          }
        }
      }
    }
    return existingRoom
  }

  return (
    <div style={styles.mainPage}>
      {!fetchedItem && (
        <Spinner animation="border" role="status" className="mt-5">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {fetchedItem && (
        <Container className="p-5" fluid>
          <Row>
            <Col>
              <h2>{fetchedItem.title}</h2>
              <p>{fetchedItem.description}</p>
              <Card>
                <Card.Title className="mt-3">
                  Current price:{" "}
                  {fetchedItem.bids.length
                    ? fetchedItem.bids[fetchedItem.bids.length - 1].amount
                    : fetchedItem.startPrice}{" "}
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
                            <strong>{fetchedItem.minimumBid}</strong>{" "}
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
                          min={fetchedItem.minimumBid}
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
                  <Counter dateFrom={fetchedItem.deadline}></Counter>
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
