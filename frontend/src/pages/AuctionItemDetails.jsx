import React from "react";
import Counter from "../components/Counter"
import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
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
  Carousel
} from "react-bootstrap";
import { useBidContext } from "../contexts/BidContext";
import { UserContext } from "../contexts/UserContext";
import CustomModal from "../components/CustomModal";

function AuctionItemDetails() {
  const { id } = useParams();
  const { fetchAuctionItem } =
    useAuctionItem();
  const [auctionItem, setAuctionItem] = useState();
  const { postNewBid } = useBidContext();
  const [bid, setBid] = useState("");
  const { currentUser } = useContext(UserContext);
  const [myProp, setMyProp] = useState({});
  const [highestBid, setHighestBid] = useState();
  const [itemImages, setItemImages] = useState([]);

  useEffect(() => {
    getAuctionItem(id);
  }, [id, highestBid]);

  const getAuctionItem = async (auctionItemId) => {
    let fetchedItem = await fetchAuctionItem(auctionItemId);
    setAuctionItem(fetchedItem);
    orderImages(fetchedItem);
  };

  function orderImages(auctionItem) {
    const origImageArray = auctionItem.images.split(",");
    const imageArrayInOrder = [];

    imageArrayInOrder.push(origImageArray[auctionItem.primaryImgIndex])
    origImageArray.splice(auctionItem.primaryImgIndex, 1);

    if (origImageArray.length) {
      for (let image of origImageArray) {
        imageArrayInOrder.push(image)
      }
    }

    setItemImages(imageArrayInOrder);

  }

  const checkUser = () => {
    if (currentUser) {
      return currentUser.id === auctionItem.owner.id ? false : true
    } else { return true }
  }

  async function placeBid(e) {
    e.preventDefault();

    if (currentUser === null || currentUser === undefined) {
              setMyProp({
                show: true,
                text: "You must log in to place a bid",
              });
      return
    }

    if (checkBid) {
      let newBid = {
        amount: parseInt(bid),
        time: new Date(),
        user_id: currentUser.id.toString(),
        auctionItem: auctionItem,
      };

      let res = await postNewBid(newBid);
      if (res) {
        setHighestBid(bid);
        setMyProp({
          show: true,
          colour: "green",
          text: "Bid placed!"
        });
        setBid("");
      } else {
        setMyProp({
          show: true,
          colour: "red",
          text: "Something went wrong, bid not placed"
        })
      }
    } else {
      console.log("Bid too low");
    }
  }

  function checkBid() {
    return bid >= auctionItem.minimumBid ? true : false;
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

  return (
    <div style={styles.mainPage}>
      {!auctionItem && (
        <Spinner animation="border" role="status" className="mt-5">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {auctionItem && (
        <Container className="p-5" fluid>
          <Row>
            <Col>
              <h2>{auctionItem.title}</h2>
              <p>{auctionItem.description}</p>
              <Card>
                <Card.Title className="mt-3">
                  Highest bid: {auctionItem.currentPrice}{" "}
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
                    <Form className="mx-5" onSubmit={placeBid}>
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip id="tooltip-top">
                            The minimum bid that can be placed is:{" "}
                            <strong>{auctionItem.minimumBid}</strong>{" "}
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
                          min={auctionItem.minimumBid}
                          value={bid}
                          onChange={(e) => setBid(e.target.value)}
                        ></Form.Control>
                      </OverlayTrigger>
                      <Button type="submit" variant="success" className="mt-2">
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
                  <Counter dateFrom={auctionItem.deadline}></Counter>
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
              { currentUser &&
                <Link to={"/chat/" + currentUser.id}>Chat with seller</Link>}
            </Col>
          </Row>
          <CustomModal prop={myProp} func={pull_data} />
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
};
